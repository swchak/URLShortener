<template lang="html">
    <div id="card-container">
         <v-text-field
            v-model="longUrl"
            clearable
            label="Enter long url link to shorten"
          ></v-text-field>
        <div class="error" v-if="!$v.longUrl.minLength">Long Url must have at least {{$v.longUrl.$params.minLength.min}} characters.</div>
        <div class="error" v-if="!$v.longUrl.maxLength">Long Url cannot be more than {{$v.longUrl.$params.maxLength.max}} characters.</div>
        <div class="error" v-if="!$v.longUrl.url">Enter a string in url format</div>
        <v-btn :disabled="longUrl.length === 0" depressed color="darkblue" @click="submit">Shorten</v-btn>

       <v-text-field
              v-if='this.shortUrl.length>0'
              :value="shortUrl"
              label="Shortened Url"
              filled
              disabled
            ></v-text-field>
    
    </div>
</template>

<script>
import { minLength, maxLength, url} from 'vuelidate/lib/validators'
import httpSvc from '../services'

export default {
    name: "ShortenUrlPage",
    data() {
        return {
             longUrl: "",
             shortUrl: ""
        }
    },
    validations: {
        longUrl: {
            minLength: minLength(25),
            maxLength: maxLength(200),
            url
        }
    },
    methods: {
        submit() {
            httpSvc.post('/shorten-url', {
                longUrl: this.longUrl
            }).then(res => {
                this.shortUrl = res.config.baseURL + '/' + res.data.shortUrlCode
    
            })
            // call post api
            
        }
    }
}
</script>

<style lang="scss">
    #card-container  {
        margin-left: 20%;
        margin-right: 20%;
        height: 70%;
    }
</style>