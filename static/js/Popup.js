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
`))

document.head.appendChild(style)


;(function($){
  console.log($)
  $.Popup  = function(opts) {
    this._opts = {
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
          <button class="success">${this._opts.yes}</button>
          <button class="cancel">${this._opts.no}</button>
        </div>
    `
    this.bg = $(`<div style="display: none;position: fixed;width: 100%;height: 100%;z-index: 99999;top:0;background: rgba(255,255,255,.4)"></div>`)

    $("body").append(this.bg)
    $("body").append(this.html)
    this.el = $("#Modal")

    var that = this
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

    this.Show = function(opts){
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
  
   
})(jQuery);
