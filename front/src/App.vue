<template>
   <div v-if="showErr">
      <q-banner inline-actions class="text-white bg-red">
         La sala en que intenta ingresar se encuentra llena
         <template v-slot:action>
            <q-btn flat color="white" label="Intentar de nuevo" />
         </template>
      </q-banner>
   </div>

   <q-dialog persistent v-model="modalRegister">
      <q-card style="min-width: 350px">
         <q-card-section>
            <div class="text-h6">Nombre de usuario</div>
         </q-card-section>

         <q-card-section class="q-pt-none">
            <q-input dense v-model="dataUser.user" :maxlength="10" />
         </q-card-section>

         <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn flat label="Guardar" @click="saveUser" />
         </q-card-actions>
      </q-card>
   </q-dialog>
   <div class="bodyChat" v-if="!modalRegister">
      <div class="container">
         <div class="header">
            <q-avatar rounded color="primary" text-color="white" :size="'md'">{{dataUser.user.charAt(0).toUpperCase()}}
            </q-avatar>
            <span style="padding-left: 8px;">{{dataUser.user}}</span>
         </div>

         <div class="chat justify-center" id="body">
            <div v-for="item in allMessage" style="width: 100%;  justify-content: center; padding: 10px;">
               <div v-if="item.type==='sender'">
                  <q-chat-message name="me" bg-color="cyan-1" :text="[`${item.message}`]" sent />
               </div>
               <div v-if="item.type==='receiver'">
                  <q-chat-message :name=item.user bg-color="blue-grey-7" text-color="cyan-1"
                     :text="[`${item.message}`]" />
               </div>
            </div>
         </div>


         <div class="footer">
            <div style="flex: 2;">
               <input v-on:keyup.enter="eventEnter" v-model="messages" type="text" class="css-input" />
            </div>
            <div>
               <img src="./assets/send.png" style="padding-right:13px; padding-top: 2px; cursor: pointer;" />
            </div>
         </div>
      </div>
   </div>
</template>

<script lang="ts">
import {
   defineComponent, onMounted, ref
} from "vue";
import { io } from "socket.io-client";
import { v4 as uuidv4 } from 'uuid';

export type message = {
   id: string,
   user: string,
   type: 'sender' | 'receiver';
   message: string
}


export type userData = {
   id: string,
   user: string,
}

export default defineComponent({
   setup() {
      //VARIABLES
      const allMessage = ref<Array<message>>([])

      const dataUser = ref({} as userData)
      const showErr = ref<boolean>(false)
      const modalRegister = ref<boolean>(true)
      const messages = ref<string>("");
      const socket = io("http://localhost:3000", {
         transports: ["websocket"]
      });

      //METHODS
      const eventEnter = (e: Event) => {
         if (messages.value != "") {
            const bodySend: message = {
               id: dataUser.value.id,
               user: dataUser.value.user,
               type: "sender",
               message: messages.value
            }

            allMessage.value.push(bodySend)

            socket.emit("message", bodySend);

            messages.value = ""

            setTimeout(updateScroll, 100)
         }
      }

      const updateScroll = () => {
         let objDiv = document.getElementById("body");
         objDiv!.scrollTop = objDiv!.scrollHeight;
      }

      const saveUser = () => {
         if (dataUser.value.user != "") {
            const parsed = JSON.stringify({ id: dataUser.value.id, user: dataUser.value.user } as userData);
            localStorage.setItem('user', parsed);
            modalRegister.value = false
         }
      }

      const userVerification = (): void => {
         const userLocalStorage = localStorage.getItem("user");

         if (!userLocalStorage) {
            modalRegister.value = true
            dataUser.value.id = uuidv4()

         } else {
            modalRegister.value = false
            const jsonParse = JSON.parse(userLocalStorage) as userData;

            dataUser.value.id = jsonParse.id;
            dataUser.value.user = jsonParse.user;
         }
      }

      const listeningEvents = () => {
         socket.on('messageResponse', (arg: message) => {
            if (arg.id != dataUser.value.id) {
               arg.type = "receiver"
               allMessage.value.push(arg)
               setTimeout(updateScroll, 100)
            }
         });
         /* socket.on('fullRoom', (arg: message) => {
            showErr.value = true;
         }); */
      }

      listeningEvents()
      onMounted(userVerification);

      return {
         messages,
         eventEnter,
         allMessage,
         modalRegister,
         saveUser,
         dataUser,
         showErr
      };
   },
})

</script>

<style scoped>
.footer {
   background: #E8ECEF;
   width: 100%;
   height: 35px;
   display: flex;
}

.css-input {
   border-color: #0e0b0b;
   border-style: solid;
   font-size: 14px;
   padding: 7px;
   border-width: 0px;
   width: 99%;
}

.css-input:focus {
   outline: #324559;
}

.chat {
   justify-content: center;
   background: #E6E9EB;
   height: 40vh;
   width: 100%;
   overflow-y: auto;
}

.header {
   color: #324559;
   padding: 8px;
   width: 100%;
   height: 48px;
   background: #F5F5F5;
   /* position: absolute; */
   /* z-index: 1; */
}

.container {
   position: absolute;
   justify-content: center;
   width: 650px;
   height: 120px;
   position: absolute;
}

.bodyChat {
   padding-top: 20px;
   display: flex;
   justify-content: center;
   position: relative;
}

/* width */
::-webkit-scrollbar {
   width: 7px;
}

/* Track */
::-webkit-scrollbar-track {
   background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
   background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
   background: #555;
}
</style>
