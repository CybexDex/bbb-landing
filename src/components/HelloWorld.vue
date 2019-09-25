<template>
  <v-app id="inspire">
    <v-content>
      <v-container
              class="fill-height"
              fluid
      >

<div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline"
          primary-title
        >
          注册成功
        </v-card-title>

        <v-card-text class="dialogText">
          注册成功，快去APP赚取收益吧！
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
              关闭
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

        <v-col>
        
        <v-row
                align="center"
                justify="center"
        >
          <v-col
                  cols="12"
                  sm="8"
                  md="3"
          >
            <v-card class="elevation-5">
              <v-sheet
                      width="100%"
                      height="220"
                      color="primary"
                      dark
                      tile
                      class="text-center pt-8 heading"
              >
                <img src="/logo.png" width="100px" />
                <div class="title">BBB-首个去中心化数字资产合约产品</div>
                <div class="caption">低手续费、透明公平<br />杠杆交易，规则简单</div>
              </v-sheet>

              <v-card-text class="px-10 pb-0">
                <v-form ref="form" @submit.prevent="createAccount" lazy-validation v-model="isAccountValid">
                  <v-text-field
                          :label="form_label.account_name"
                          v-model="name"
                          :rules="nameRules"
                          required
                          clearable
                          type="text"
                          @input="onAccountNameChanged"
                  ></v-text-field>

                  <v-text-field
                          v-model="password"
                          :label="form_label.pwd"
                          :rules="passwordRules"
                          :type="showPassword?'text':'password'"

                          clearable
                          required
                  >
                    <v-icon slot="append" v-on:click="showPassword=!showPassword">mdi-eye-outline</v-icon>
                  </v-text-field>
                  <v-text-field
                          :label="form_label.pwdrpt"
                          name="passwordagain"
                          v-model="repeatpwd"
                          :rules="[value => !!value ? value === password || validation.pwd_unmatched : validation.pwd_repeat]"
                          :type="showPassword?'text':'password'"
                          clearable
                          required
                  >
                    <v-icon slot="append" v-on:click="showPassword=!showPassword">mdi-eye-outline</v-icon>
                  </v-text-field>

                  <v-text-field
                          :label="form_label.captcha"
                          name="captcha"
                          v-model="captcha"
                          type="text"
                          :rules="[v => !!v || validation.validcode_required ]"
                          required
                          clearable
                  >
                    <template slot="append" bottom>
                      <a v-if="verifyCode" @click="refreshCaptcha()" class="captcha-field">
                        <span v-html="verifyCode.data"/>
                      </a>
                    </template>
                  </v-text-field>

                  <v-text-field
                          :disabled="!refererDisabled"
                          id="refer"
                          v-model="referer"
                          :label="form_label.refer"
                          name="refer"
                          type="text"
                          clearable
                  ></v-text-field>

                  <v-checkbox
                          v-model="warnForgot"
                          :rules="[v => !!v || validation.warn ]"
                          :label="form_label.agree"
                          required
                  ></v-checkbox>


                </v-form>
              </v-card-text>
              <v-card-actions class="pa-5">
                <v-spacer></v-spacer>
                <v-btn
                        color="primary"
                        block
                        @click="createAccount"
                        v-text="form_label.register">
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>


          <v-col
                  cols="12"
                  sm="8"
                  md="4"
                  class="text-center marketing justify-center align-center"
          >
            <v-row>

              <v-col
                      cols="12"
                      md="5"
              >
                <div class="title mt-5">
                  所有交易上链公开透明<br />
                  杜绝人为操作价格
                </div>
              </v-col>

              <v-col
                      cols="12"
                      md="7"
              >

                <v-sheet color="#FFF" tile>
                  <img src="/chart.svg" />
                </v-sheet>
              </v-col>

              <v-col
                      cols="12"
                      md="5"
              >
                <div class="title mt-5"> 不同杠杆产品<br />
                  1USDT即可交易

                </div>
              </v-col>

              <v-col
                      cols="12"
                      md="7"
              >

                <img src="/price.png" />
              </v-col>

              <v-col
                      cols="12"
                      md="5"
              >
                <div class="title mt-5">
                  详尽指标展示<br />
                  轻松掌握平仓时机
                </div>
              </v-col>

              <v-col
                      cols="12"
                      md="7"
              >

                <img src="/chart.svg" />


              </v-col>
            </v-row>
          </v-col>
        </v-row>
        
          <v-row 
            align="center"
            justify="center"
            >
            <div  class="qr-area">
                  <div class="single-qr">
                    <qrcode-vue :value="downloadLink" :size="qrSize" level="H" class="qr-mobile"></qrcode-vue>
                    <span>Android</span>
                  </div>
                  <div class="single-qr">
                    <qrcode-vue :value="tutorial" :size="qrSize" level="H" class="qr-mobile"></qrcode-vue>
                    <span>iOS</span>  
                  </div>
                </div>
            <p class="qr-hint" ><b>扫描二维码下载APP</b></p>    
          </v-row>

        </v-col>
        
      </v-container>
    </v-content>

    <v-footer
            color="primary"
            padless
            class="footer"
    >
      <v-row
              justify="center"
              no-gutters
      >
        <v-btn
                rounded
                class="my-2 "
                dark
                text
        >
          <a href="https://cybex.io" target="_blank" class="white--text">Cybex</a>
        </v-btn>

        <v-btn
                rounded
                class="my-2 "
                dark
                text
        >
          <a href="https://bbb2019.zendesk.com/hc/zh-cn" target="_blank" class="white--text">帮助与反馈</a>

        </v-btn>

        <v-btn
                rounded
                class="my-2 "
                dark
                text
                @click="activate()"
        >
          联系我们
        </v-btn>
      </v-row>
    </v-footer>
  </v-app>
</template>

<style>
  .marketing img{
    max-width: 100%;
  }

  a{
    text-decoration: none;
  }

  footer{
    margin-top:20px
  }

  .heading{
    background: linear-gradient(0deg, #c62c43 0%, #f55e5d 100%);
  }

  .qr{
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .qr-mobile{
    margin: 30px 20px 0px 20px;
  }

  .qr-area{
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 10px;
  }

  .qr-hint{
    position: absolute;
    margin-top: 100px;
    margin-bottom:10px;
  }

  .single-qr{
    text-align: center;
  }

  .alert{
    background-color: #c62c43;
  }

  .dialogText{
    margin-top:20px;
    height: 40px;
    text-align: left;
  }

  .headline{
    color: white;
    background-color: #c62c43;
  }

</style>

<script>
  import { debounce } from "lodash";
  import axios from "axios";
  import PrivateKey from "../ecc/src/PrivateKey";
  import QrcodeVue from "qrcode.vue";

  const config = {
    // faucet: 'http://uatfaucet.51nebula.com',
    faucet: 'https://faucet.cybex.io',
    chain: 'http://18.136.140.223:38090', 
  }

  let _keyCachePriv = {};
  let _keyCachePub = {};

  const validation = {
    "validcode_required": "请输入验证码",
    "pwd_too_short": "密码必须至少包含12位字符,且包含一个数字、大写字母、小写字母和特殊字符",
    "pwd_number": "密码必须至少包含一个数字、大写字母、小写字母和特殊字符",
    "pwd_number_simple": "密码必须至少包含一个数字、大写字母和小写字母",
    "pwd_strength": "密码强度：%s",
    "account_required": "请输入账户名",
    "pwd_required": "请输入密码",
    "pwd_unmatched": "两次输入的密码不一致",
    "pwd_repeat": "请再次输入密码",
    "account_not_exists": "账户名或密码错误",
    "account_too_short": "账户名过短",
    "account_too_long": "账户名过长",
    "account_slash": "账户名必须至少包含一个数字或横杠",
    "account_slash_limit": "账户名不能包含连续的横杠",
    "account_alpha": "账户名必须以小写字母开始",
    "account_number": "账户名必须以小写字母或数字结尾",
    "account_no_sign": "账户名仅能包含小写字母、数字、横杠",
    "not_enough_balance": "余额不足",
    "pwd_wrong": "密码错误",
    "warn":"必须同意方能继续",
    "invalid_memo_XRP": "非法的TAG，请检查",
    "account_exists": "账户名已存在",
    "priKey_invalid": "没有权限"
  }

  export default {
    props: {
      source: String,
    },
    data: () => ({
      validation: validation,
      form_label:{
        account_name: "用户名",
        pwd:"密码,至少12位長",
        pwdrpt:"确认密码",
        captcha: "验证码",
        refer:"推荐人",
        agree:"我确认已妥善备份即将创建的账户名称及其密码，并知晓一旦密码遗忘，将无法找回，也无法再次登陆账户或使用账户资金",
        register:"注册"
      },
      message: "",
      verifyCode: {},
      isAccountChecked: false,
      isAccountValid: false,
      isAccountNew: false,
      showCopied: false,
      showPassword: false,
      useGenerated: false,
      warnForgot: false,
      pwdStrength: 1,
      generated: "",
      name: "",
      password: "",
      repeatpwd: "",
      captcha: "",
      referer: "",
      qrValue: "hello, world",
      qrSize: 100,
      tutorial: 'https://bbb2019.zendesk.com/hc/zh-cn/articles/360033801811-BBB-%E6%95%99%E7%A8%8B',
      downloadLink: 'https://app.cybex.io/MobileAPP/BBB_release.apk',
      dialog: false,
      refererDisabled: false,

      // nameRules: [
      //   value => !!value || validation.account_required,
      //   value => (!/([^a-z0-9\-])/g.test(value)) || validation.account_no_sign,
      //   value => (/^([a-z])/g.test(value))|| validation.account_alpha,
      //   value => value.length > 3|| validation.account_too_short,
      //   value => value.length < 31|| validation.account_too_long,
      //   value => (/[0-9\-]+.*$/g.test(value)) || validation.account_slash,
      //   value => (/^((?!\-\-).)*$/g.test(value)) || validation.account_slash_limit,
      //   value => (/([a-z0-9])$/g.test(value)) || validation.account_number
      // ],
      passwordRules: [
        value => !!value || validation.pwd_required,
        value => value.length >= 12 || validation.pwd_too_short,
        value => (/[a-z0-9]{1,}/g.test(value) && /[a-z]{1,}/g.test(value) && /[A-Z]{1,}/g.test(value) &&  /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]{1,}/g.test(value)) || validation.pwd_number
      ],
      validcodeRules: [
        value => !!value || validation.validcode_required
      ],
      inRegister: false,
    }),
    methods: {
      isiOS(){
        const flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad)/i)
	      return flag;
      },
      isAndroid(){
        const flag = navigator.userAgent.match(/(Android|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS)/i)
	      return flag;
      },
      isMobile() {
        const flag= !(this.isiOS() === null && this.isAndroid() === null);
        return flag;
      },
      activate(){
        zE.activate();
      },
      // onPasswordChanged() {
      //   this.$refs.form.validate();
      // },
      onAccountNameChanged: debounce(async function() {
        if (!this.name) return;
        this.isAccountChecked = false;
        this.name = (this.name || "").slice(0, 64);
        try {
          const data = {"method": "call", "params": [0, 'get_full_accounts', [this.name]], "id": 1};
          const result = await axios.post(config.chain, data);
          console.log("TCL: result", result)
          
          if(result.data.length === 0){
            this.isAccountNew = true;
          }
          // this.isAccountNew = true;
          // this.isAccountChecked = true;
          // this.$refs.form.validate();
        } catch (e) {
          // this.isAccountNew = true;
          // this.isAccountChecked = true;
          // this.$refs.form.validate();
        }
      }, 200),
      // checkName(value, returnBool) {
      //   let msg;
      //   let valid = true;
      //   this.nameRules.forEach(rule=>{
      //     msg =  rule(value);
      //     if(msg !== true)
      //       valid = false;
      //   });
      //   if (returnBool){
      //     return !!msg;
      //   }
      //   return msg;
      // },
      // checkPassword(value, returnBool){
      //   let msg;
      //   this.passwordRules.forEach(rule=>{
      //     msg = rule(value)
      //   })
      //   if (returnBool){
      //     return !!msg;
      //   }
      //   return true;
      // },

      async refreshCaptcha() {
        if (this.autoRefresh) {
          clearTimeout(this.autoRefresh);
          this.autoRefresh = null;
        }
        this.autoRefresh = setTimeout(() => {
          this.refreshCaptcha();
        }, 1.5 * 60 * 1000);
        let s = await this.verify_code();
        this.verifyCode = s;
      },

      async verify_code() {
        if (!navigator.onLine) {
          throw new Error(`UN.network.verify_code`)
        }
        try {
          let hr = await axios.get(`${config.faucet}/captcha`);
          if (hr.status === 200 && hr.data.id && hr.data.data) {
            return hr.data
          } else {
            // console.error(hr.data)
            throw new Error(`S.faucet.verify_code`)

          }
        } catch (e) {
          // console.error(e)
          throw new Error(`S.faucet.verify_code`)
        }
      },
      generateKeys(accountName, password, roles, prefix) {
        if (!accountName || !password) {
          throw new Error("Account name or password required");
        }
        if (password.length < 12) {
          throw new Error("Password must have at least 12 characters");
        }
        // let privKeys = {};
        let pubKeys = {};

        (roles || ["active", "owner", "memo"]).forEach(role => {
          let seed = accountName + role + password;
          let pkey = _keyCachePriv[seed] ? _keyCachePriv[seed] : PrivateKey.fromSeed(seed);
          _keyCachePriv[seed] = pkey;
          // console.log(role,seed,pkey.toWif(),pkey.toHex())
          // privKeys[role] = pkey;
          pubKeys[role] = _keyCachePub[seed] ? _keyCachePub[seed] : pkey.toPublicKey().toString(prefix);

          _keyCachePub[seed] = pubKeys[role];
        });
        return pubKeys
      },
      async createAccount() {
        let pubKeys = this.generateKeys(this.name, this.password)
        let result;
        try {
          result = await axios.post(`${config.faucet}/register`, {
            "cap": {
              "id": this.verifyCode.id,
              "captcha": this.captcha
            },
            "account": {
              "name": this.name,
              "owner_key": pubKeys.active,
              "active_key": pubKeys.owner,
              "memo_key": pubKeys.owner,
              "refcode": this.refcode,
              "referrer": this.referrer
            }
          });
          this.dialog = true;
          if(this.isAndroid() === true){
            window.location.href=this.downloadLink;
          }else if(this.isiOS() === true){
            window.location.href=this.tutorial;            
          }
        } catch (e) {
          this.dialog = false;
          if (e.response.data) {
            throw new Error(e.response.data)
          }
        }
        if (result.status === 200) {
          return result.data
        } else {
          throw new Error("S.faucet.register")
        }
      }
    },
    components:{
      QrcodeVue,
    },
    computed: {
      nameRules(){
        return [
          value => !!value || validation.account_required,
          value => (!/([^a-z0-9\-])/g.test(value)) || validation.account_no_sign,
          value => (/^([a-z])/g.test(value))|| validation.account_alpha,
          value => value.length > 3|| validation.account_too_short,
          value => value.length < 31|| validation.account_too_long,
          value => (/[0-9\-]+.*$/g.test(value)) || validation.account_slash,
          value => (/^((?!\-\-).)*$/g.test(value)) || validation.account_slash_limit,
          value => (/([a-z0-9])$/g.test(value)) || validation.account_number,
          value=> (this.isAccountChecked && this.isAccountNew) || validation.account_exists
        ]
      }
    },
    async mounted() {
      const url_string = window.location.href;
      const url = new URL(url_string);
      this.referer = url.searchParams.get("id");
      if(this.referrer !== ""){
        this.refererDisabled = true;
      }
      await this.refreshCaptcha();
    }
  }
</script>

