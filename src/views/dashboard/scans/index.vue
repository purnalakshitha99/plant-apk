<template>
  <ion-content class="ion-padding" fullscreen>
    <ion-loading
      :is-open="is_loading"
      cssClass="my-custom-class"
      message="Please wait..."
    />
    <div v-if="imageURL !== null">
      <!-- Your image preview here -->
      <div class="image-container">
        <img :src="imageURL" alt="Plant" />
      </div>

      <ion-label class="plant-name">
        Predicted Name : {{ predicted_name }}</ion-label
      >

      <!-- Buttons -->
      <ion-row>
        <ion-col size="12">
          <ion-button expand="full" @click="uploadPredictedData"
            >Save</ion-button
          >
        </ion-col>
        <ion-col size="12">
          <ion-button expand="full" @click="cancelUpload">Cancel</ion-button>
        </ion-col>
      </ion-row>
    </div>
    <div v-else>
      <!-- Your other content here -->
      <ion-button @click="getGeolocation" expand="full">
        <ion-icon slot="start" :icon="locationIcon"></ion-icon>
        Get Geolocation
      </ion-button>
      <ion-button @click="openCamera" expand="full">
        <ion-icon slot="start" :icon="cameraIcon"></ion-icon>
        Open Camera
      </ion-button>
      <ion-card v-if="location">
        <ion-card-header>
          <ion-card-title>Location Information</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>Latitude: {{ location.latitude }}</p>
          <p>Longitude: {{ location.longitude }}</p>
        </ion-card-content>
      </ion-card>
      <pwa-camera-modal></pwa-camera-modal>
    </div>
  </ion-content>
</template>

<script>
import {
  IonButton,
  IonContent,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonLoading,
} from "@ionic/vue";
import { locationOutline, cameraOutline } from "ionicons/icons";
import { Camera, CameraResultType } from "@capacitor/camera";
import prediction_api from "../../../apis/modules/prediction_api";
import axios from "axios";

export default {
  components: {
    IonButton,
    IonContent,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonLoading,
  },
  data() {
    return {
      location: null,
      locationIcon: locationOutline,
      imageURL: null,
      is_loading: false,
      predicted_name: null,
      loggedUser: JSON.parse(localStorage.getItem("user")),
      latitude:'',
      longitude:''

    };
  },
  methods: {
    getGeolocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          this.handleSuccess,
          this.handleError,
          {
            enableHighAccuracy: true, // Try to get more accurate location if available
            timeout: 10000, // Set a timeout for how long to wait for the location (in milliseconds)
          }
        );
      } else {
        alert("Geolocation is not supported by your device.");
      }
    },
    handleSuccess(position) {
      // Handle successful geolocation here
      this.location = position.coords
      this.latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    },

    handleError(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          alert("Permission to access location was denied by the user.");
          break;
        case error.POSITION_UNAVAILABLE:
          alert("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          alert("The request to get user location timed out.");
          break;
        case error.UNKNOWN_ERROR:
          alert("An unknown error occurred while trying to get the location.");
          break;
        default:
          alert("An error occurred while trying to get the location.");
      }
    },

    async openCamera() {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
      });

      // Do something with the image
      const imageBlob = this.base64ToBlob(image.base64String, "image/jpeg");

      this.is_loading = true;

      const formData = new FormData();
      formData.append("key", "71dc79788689cfef44877c37564a1fb5");
      formData.append("image", imageBlob);

      try {
        const response = await axios.post(
          "https://api.imgbb.com/1/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response.data);
        this.imageURL = response.data.data.display_url;
        this.predictImage();
      } catch (e) {
        alert(error);
      }
    },

    async predictImage() {
      try {
        let payload = {
          image_url: this.imageURL,
        };
        let respond = (await prediction_api.predictImage(payload)).data;
        this.predicted_name = respond.result_index;

        console.log(respond);
      } catch (e) {
        alert(error);
      }
      this.is_loading = false;
    },

    async uploadPredictedData() {
      try {
        this.is_loading = true;
        let payload = {
          user_id: this.loggedUser._id,
          image_url: this.imageURL,
          predicted_name: this.predicted_name,
        };
        let respond = (await prediction_api.savePredictedData(payload)).data;
        this.predicted_name = respond.result_index;
        window.location = "/dash_board";

        console.log(respond);
      } catch (e) {
        alert(error);
      }
      this.is_loading = false;
    },

    cancelUpload() {
      this.imageURL = null;
    },

    async uploadImage() {},

    base64ToBlob(base64, contentType) {
      const sliceSize = 512;
      const byteCharacters = atob(base64);
      const byteArrays = [];

      for (
        let offset = 0;
        offset < byteCharacters.length;
        offset += sliceSize
      ) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }

      return new Blob(byteArrays, { type: contentType });
    },
  },
};
</script>

<style scoped>
/* Add any custom styles here if needed */
.image-container {
  width: 100%;
  text-align: center;
}

.image-container img {
  max-width: 100%;
  height: auto;
}

.plant-name {
  text-align: center;
  margin-bottom: 10px;
  font-weight: bold; /* Make the text bold */
  font-size: 16px;
}

.plant-image {
  max-width: 100%;
}
</style>
