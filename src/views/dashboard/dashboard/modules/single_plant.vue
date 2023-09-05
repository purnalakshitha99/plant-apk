<template>
  <ion-modal :is-open="is_model_open">
    <ion-content>
      <ion-toolbar>
        <ion-title>Modal</ion-title>
        <ion-buttons slot="end">
          <ion-button color="light" @click="closeModel()">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
      <ion-content class="content">
        <div class="plant-detail">
          <div class="image-container">
            <img :src="single_plant.url" alt="Plant" />
          </div>
          <div class="details">
            <p>Age: 10</p>
            <p>Type: {{ single_plant.predicted_name }}</p>
            <p>Description:</p>
          </div>
        </div>
      </ion-content>
    </ion-content>
  </ion-modal>
</template>
  
  <script>
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonItem,
  IonList,
  IonAvatar,
  IonImg,
  IonLabel,
  IonRow,
  IonCol,
  IonText,
  alertController,
  IonSpinner,
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    IonButtons,
    IonButton,
    IonModal,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonItem,
    IonList,
    IonAvatar,
    IonImg,
    IonLabel,
    IonRow,
    IonCol,
    IonText,
    IonSpinner,
  },
  data() {
    return {
      is_btn_loading: false,
      single_plant: {},
      is_model_open: false,
    };
  },
  methods: {
    handleModel(data) {
      this.single_plant = data;
      this.is_model_open = !this.is_model_open;
    },

    closeModel() {
      this.is_model_open = !this.is_model_open;
    },

    // async confirmRequest() {
    //   const alert = await alertController.create({
    //     header: "Are you sure?",
    //     cssClass: "custom-alert",
    //     buttons: [
    //       {
    //         text: "No",
    //         cssClass: "alert-button-cancel",
    //       },
    //       {
    //         text: "Yes",
    //         cssClass: "alert-button-confirm",
    //         handler: () => {
    //           this.deleteUser();
    //         },
    //       },
    //     ],
    //   });

    //   await alert.present();
    // },
  },
});
</script>
  
  
<style scoped>
/* Apply custom CSS to make the modal full-screen */
ion-modal {
  --width: 100%;
  --height: 100%;
  --border-radius: 0;
  --position: fixed;
  --top: 0;
  --left: 0;
  --background: transparent;
}

ion-content {
  height: 100%; /* Fill the entire height of the modal */
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.plant-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
}

.image-container {
  width: 100%;
  text-align: center;
}

.image-container img {
  max-width: 100%;
  height: auto;
}

.details {
  margin-top: 20px;
  text-align: center;
}
</style>
  