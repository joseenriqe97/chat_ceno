<template>
  <!-- <center>
    <h4>CHAT</h4>
  </center> -->
  <div class="bodyChat">
    <div class="container">
      <div class="header">
        <q-avatar rounded color="primary" text-color="white" :size="'md'">J</q-avatar>
        <span style="padding-left: 8px;">Jose Bonilla</span>
      </div>
      <div class="chat">
       <!--  <div style="width: 100%; max-width: 600px; padding-top: 48px;">

          <q-chat-message name="Jane" bg-color="blue-grey-7" text-color="cyan-1"
            avatar="https://cdn.quasar.dev/img/avatar2.jpg" :text="['doing fine, how r you?']" />
          <q-chat-message name="me" bg-color="cyan-1" avatar="https://cdn.quasar.dev/img/avatar1.jpg"
            :text="['hey, how are you?']" sent />

        </div> -->
      </div>
      <div>
      </div>
      <!-- <div class="inputs">
        <div>
          input
        </div>
        <div>
          input
        </div>
      </div> -->
      
    </div>
  </div>



</template>

<script lang="ts">
import {
  defineComponent, ref
} from "vue";

export default defineComponent({
  setup() {
    const messages = ref("");
    const eventEnter = (e: Event) => {
      console.log(e)
      messages.value = "Me presionaron :d"
    }
    return {
      messages,
      eventEnter
    };
  },
})

</script>

<style scoped>
.inputs {
  background:black;
  width: 100%;

}

.chat {
  justify-content: center;
  /* background: #E7EAEB; */
  height: 59vh;
  width: 100%;
}

.header {
  color: #324559;
  padding: 8px;
  width: 100%;
  height: 48px;
  background: #F5F5F5;
  position: absolute;
  z-index: 1;
}

.container {
  background: red;
  justify-content: center;
  width: 650px;
  height: 65vh;
  display: flex;
  position: relative;
}

.bodyChat {
  padding-top: 20px;
  display: flex;
  justify-content: center;
}

.inputChat {
  display: flex;
}

.inputT {
  flex: 2;
}

#mensajes {
  height: auto;
}

.texto {
  padding: 4px;
  background: #fff;
}

.css-input {
  border-color: #cccccc;
  border-style: solid;
  font-size: 14px;
  padding: 7px;
  border-radius: 37px;
  border-width: 0px;
  width: 100%;
}

.css-input:focus {
  outline: none;
}
</style>
