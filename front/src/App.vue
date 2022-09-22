<template>
  <center>
    <h4>CHAT</h4>
  </center>
  <div class="row justify-center">
    <div style="background: #6a6a6f; width: 150vh; height: 70vh;">
      <div class="q-pa-md row justify-center" style="width: 150vh; height: 65vh; background-color:#182028;" id="global">
        <div style="width: 100%; max-width: 600px">
          <q-chat-message name="me" avatar="https://cdn.quasar.dev/img/avatar1.jpg" :text="['hey, how are you?']"
            sent />
          <q-chat-message name="Jane" avatar="https://cdn.quasar.dev/img/avatar2.jpg"
            :text="['doing fine, how r you?']" />
          <q-chat-message name="Jane" avatar="https://cdn.quasar.dev/img/avatar2.jpg"
            :text="['doing fine, how r you?']" />
          <q-chat-message name="Jane" avatar="https://cdn.quasar.dev/img/avatar2.jpg"
            :text="['doing fine, how r you?']" />
          <q-chat-message name="Jane" avatar="https://cdn.quasar.dev/img/avatar2.jpg"
            :text="['doing fine, how r you?']" />
          <q-chat-message name="Jane" avatar="https://cdn.quasar.dev/img/avatar2.jpg"
            :text="['doing fine, how r you?']" />
          <q-chat-message name="Jane" avatar="https://cdn.quasar.dev/img/avatar2.jpg"
            :text="['doing fine, how r you?']" />
          <q-chat-message name="Jane" avatar="https://cdn.quasar.dev/img/avatar2.jpg"
            :text="['doing fine, how r you?']" />
          <q-chat-message name="Jane" avatar="https://cdn.quasar.dev/img/avatar2.jpg"
            :text="['doing fine, how r you?']" />
          <q-chat-message name="Jane" avatar="https://cdn.quasar.dev/img/avatar2.jpg"
            :text="['doing fine, how r you?']" />
          <q-chat-message name="Jane" avatar="https://cdn.quasar.dev/img/avatar2.jpg"
            :text="['doing fine, how r you?']" />

        </div>
      </div>

      <div style="background:red;" class="inputChat">
        <div>
          <span>input</span>
        </div>
        <div>

        </div>
      </div>
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
#global {
  background: #f1f1f1;
  overflow-y: auto;
}


.inputChat {
    display: flex;

}

#mensajes {
  height: auto;
}

.texto {
  padding: 4px;
  background: #fff;
}
</style>
