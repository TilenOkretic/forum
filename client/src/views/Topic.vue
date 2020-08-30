<template>
  <section>

    <div id="warning" style="display:none;" class="alert mt-2 alert-dismissible alert-warning">
      <button type="button" class="close" data-dismiss="alert">&times;</button>
      <h4 class="alert-heading">Warning!</h4>
      <p class="mb-0" id="warning_msg">
      </p>
    </div>

    <div class="jumbotron pb-1 pt-1 mt-2">
      <h1 class="display-2">{{this.topic.title}}</h1>
      <p class="lead mb-4">{{topic.description}}</p>
      <!--  -->
      <div v-for="reply in replies" :key="reply.id" style="max-width:100%;" class="toast show"
        role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          <strong class="mr-auto">{{reply.user.name}}</strong>
          <!-- <small>
            {{new Date(new Date(reply.created_at) - new Date(Date.now())).getTime()}}</small> -->
        </div>
        <div class="toast-body" style="word-wrap: break-word;">
          {{reply.description}}
        </div>
      </div>
      <!-- < MAYBE REMOVE BUTTON AND HAVE THE FORM WITHOUT A BUTTON PRESS > -->
      <!-- <button @click="openNewReply" type="button" style="font-size: 1em;"
        class="mb-3 mt-4 bnt btn-warning">WRITE A
        REPLY</button> -->
      <div id="topicreply" style="display: '';">
        <hr class="mt-4" style="border:1px solid white">
        <div class="form-group">
          <h4 for="description" class="text-monospace text-light">Topic Description</h4>
          <textarea class="form-control" id="description" placeholder="This is my first topic!"
            required rows="5"></textarea>
        </div>
        <button @click="submitReply" type="submit" class="btn mb-3 btn-warning">Add Reply</button>
      </div>
    </div>
  </section>
</template>

<script>
  import {
    mapState,
  } from 'vuex';
  import {
    API_URL,
    getUserFromID,
  } from '../API';

  export default {
    data: () => ({
      topic_id: new URL(window.location.href).toString().split('/')[5],
      topic: {},
      replies: [],
    }),
    async mounted() {
      const post = await fetch(`${API_URL}/topics/${this.topic_id}`);
      const res = await post.json();
      const [obj] = res;
      this.topic = obj;
      const getReplies = await fetch(`${API_URL}/topic_replies/${this.topic_id}`);
      const replyData = await getReplies.json();
      /* eslint-disable */
      for (let i = 0; i < replyData.length; i++) {
        const user = await getUserFromID(replyData[i].user_id);
        replyData[i].user = await user;
      }
      this.replies = replyData;
      setInterval(async () => {
        const post = await fetch(`${API_URL}/topics/${this.topic_id}`);
        const res = await post.json();
        const [obj] = res;
        this.topic = obj;
        const getReplies = await fetch(`${API_URL}/topic_replies/${this.topic_id}`);
        const replyData = await getReplies.json();
        /* eslint-disable */
        for (let i = 0; i < replyData.length; i++) {
          const user = await getUserFromID(replyData[i].user_id);
          replyData[i].user = await user;
        }
        this.replies = replyData;
      }, 200);
    },
    methods: {
      openNewReply(data) {
        const elm = data.srcElement;
        elm.style.display = 'none';
        const reply = document.querySelector('#topicreply');
        reply.style.display = '';
      },
      async submitReply() {
        if (this.user) {
          if (document.getElementById('description').value !== '') {
            const post = await fetch(`${API_URL}/topic_replies`, {
              method: 'POST',
              headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.token}`,
              },
              body: JSON.stringify({
                description: document.querySelector('#description').value,
                topic_id: this.topic_id,
                user_id: JSON.parse(this.user).id,
              }),
            });
            /* eslint-disable */
            const result = await post.json();
            //this.$router.go();

            document.querySelector('#warning').style.display = 'none';
            document.querySelector('#warning_msg').innerHTML = '';
          } else {
            document.querySelector('#warning').style.display = '';
            document.querySelector('#warning_msg').innerHTML = 'Reply must not be empty!';
          }
        } else {
          document.querySelector('#warning').style.display = '';
          document.querySelector('#warning_msg').innerHTML = 'You must be a user to reply!';

        }
      },
    },
    computed: mapState(['user']),
  };

</script>
