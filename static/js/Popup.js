let style = document.createElement("style");
style.appendChild(document.createTextNode(`
  #Modal {
    margin: 0 auto;
    position: fixed;
    z-index: 999999;
    display: none;
    top: 35%;
    left: 50%;
    transform: translate(-50%);
    width: 350px;
    background-color: #fff;
    border: 2px solid rgb(42,198,187);
    border-radius: 30px;
    color: #fff;
    padding: 20px;
    text-align: center;
  }
  
  #Modal .top {
    margin: 20px 0;
    color: #000;
  } 
  #Modal  button {
    margin: 0 10px;
    margin-top: 10px;
    width: 80px;
    background-color: #fff;
    border-radius: 5px;
    border: 2px solid rgb(42,198,187);
    color: #000;
    font-size: 14px;
    outline: none;
    padding: 5px 0;
  }
  #Modal button.success {
    background-color: rgb(42,198,187);
    margin-right: 10px;
  }
  #Modal  button.continue {
    background-color: rgb(42,198,187);
    text-align: center
  }
`))

document.head.appendChild(style)


;(function($){
  console.log($)
  $.Popup  = function(opts) {
    this._opts = {
      type: opts.type || 1,
      content: opts.content || "Content ......",
      yes: opts.yes || "Yes",
      no: opts.no || "No",
      yescb: opts.yescb,
      nocb: opts.nocb
    }
    this.content = document.querySelector("div")
    
    this.Visiable = false
    this.html = `
        <div id="Modal" >
          <div class="top">
            ${this._opts.content}
          </div>
    `
    if( this._opts.type == $.Popup.Modal) {
      this.html += `
              <button class="success">${this._opts.yes}</button>
              <button class="cancel">${this._opts.yes}</button>
            </div>

        `
    } else if( this._opts.type == $.Popup.Continue) {
      this.html += `
              <button class="continue">${this._opts.yes}</button>
            </div>
        `
    } else if( this._opts.type == $.Popup.Tip) {
      this.html = `
        <div id="Modal" >
          <div class="top">
            <img src="/photo/info.png" width=40/>
            <p>${this._opts.content}</p>
          </div>
        </div>
        `
    } 

    this.bg = $(`<div style="display: none;position: fixed;width: 100%;height: 100%;z-index: 99999;top:0;background: rgba(255,255,255,.4)"></div>`)

    $("body").append(this.bg)
    $("body").append(this.html)
    this.el = $("#Modal")

    var that = this
    

    if(this._opts.type == $.Popup.Continue ) {

      document.querySelector("#Modal .continue").addEventListener("click",function(){
        if(that._opts.yescb) {
          that._opts.yescb(that)
        } else {
          that.Close()
        }
      })
    } else if(this._opts.type == $.Popup.Modal )  {
      document.querySelector("#Modal .success").addEventListener("click",function(){
        if(that._opts.yescb) {
          that._opts.yescb(that)
        } else {
          that.Close()
        }
      })

      document.querySelector("#Modal .cancel").addEventListener("click",function(){
        if(that._opts.nocb) {
          that._opts.nocb(that)
        } else {
          that.Close()
        }
      })
    } else if(this._opts.type == $.Popup.Tip ) {

    }  
  
    

    this.Show = function(opts){
      if(this._opts.type == $.Popup.Tip ) {
        var that = this
        setTimeout(function(){
          that.Close()
        },2000)
      }  
      if(this.Visiable) {
        return
      }
      this.bg.show()
      this.el.show()
      this.Visiable = true
      return this;
    }
    this.Close = function(){
      if(!this.Visiable) {
        return
      }
  
      this.Visiable = false
      this.bg.hide()
      this.el.hide()
    }


  }

  $.Popup.Modal = 1
  $.Popup.Continue = 2
  $.Popup.Tip = 3
  
   
})(jQuery);
