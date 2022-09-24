<template>

   <div class="bodyChat">
      <div class="container">
         <div class="header">
            <q-avatar rounded color="primary" text-color="white" :size="'md'">J</q-avatar>
            <span style="padding-left: 8px;">Jose Bonilla</span>
         </div>
         <div class="chat justify-center">
            <div v-for="item in allMessage" style="width: 80%; justify-content: center;">
               <div v-if="item.type==='sender'">
                  <q-chat-message name="me" bg-color="cyan-1" avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                     :text="[`${item.message}`]" sent />
               </div>
               <!--  <q-chat-message name="Jane" bg-color="blue-grey-7" text-color="cyan-1"
                  avatar="https://cdn.quasar.dev/img/avatar2.jpg" :text="['doing fine, how r you?']" />
               <q-chat-message name="me" bg-color="cyan-1" avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                  :text="['hey, how are you?']" sent />
               <q-chat-message name="me" bg-color="cyan-1" avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                  :text="['hey, how are you?']" sent />
               <q-chat-message name="me" bg-color="cyan-1" avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                  :text="['hey, how are you?']" sent />
               <q-chat-message name="me" bg-color="cyan-1" avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                  :text="['hey, how are you?']" sent />
               <q-chat-message name="me" bg-color="cyan-1" avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                  :text="['hey, how are you?']" sent />

               <q-chat-message name="me" bg-color="cyan-1" avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                  :text="['hey, how are you?']" sent /> -->
            </div>
         </div>
         <div style="background: red; padding: 0; margin: 0;">
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

<script>

import { DeepstreamClient } from "@deepstream/client";
import {
   defineComponent, ref
} from "vue";
/* 
export type message = {
   id: string,
   user: string,
   type: 'sender' | 'receiver';
   message: string
} */

export default defineComponent({
   setup() {
      //VARIABLES
      const allMessage = ref<Array<message>>([])
      const messages = ref<string>("");

      //METHODS
      const eventEnter = (e: Event) => {
         allMessage.value.push({
            id: "WE",
            type: "sender",
            user: "jOSE",
            message: messages.value
         })
         console.log(allMessage)
         messages.value = ""
      }

      const client = new DeepstreamClient('localhost:6020').login({}, () => {
         //ReactDOM.render call will go in here
      })

      return {
         messages,
         eventEnter,
         allMessage
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
   border-color: #cccccc;
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
   height: 59vh;
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
   justify-content: center;
   width: 650px;
   height: 65vh;
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
   width: 10px;
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
