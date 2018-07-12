class Line {
    constructor(el,str,res,t,cb) {
        this.el = typeof el == 'string'?document.querySelector(el):el;
        this.str = str;
        this.res = res;
        this.t = t;
        this.cb = cb;
        if(this.el) {
            this.init()
        }
    }

    init() {
        this.el.innerHTML = '';
        let arr = this.str.split('')
        // this.el.textContent = 1
        setTimeout(()=>{
            this.cb&&this.cb();
            let timmer = setInterval(()=>{
                this.el.textContent = `${this.el.textContent}${arr.shift()}`
                if(arr.length == 0) {
                    clearInterval(timmer)
                    this.res(1)
                }
            },this.t||100)
        },1000)
    }

}

class Pointer {
    constructor(el,s,e,res) {
        this.el = typeof el == 'string'?document.querySelector(el):el;
        this.s = s;
        this.e = e;
        this.res = res;
        if(this.el) {
            this.init()
        }
    }

    init() {
        this.el.style.top = `${this.s}px`||'40px'
        this.el.style.left = `${this.e}px`||'400px'
        this.res(1)
    }
}

class Step {
    constructor(el,str,id,top=0,left=0,res) {
        this.el = typeof el == 'string'?document.querySelector(el):el;
        this.res = res;
        this.str = str;
        this.top = top;
        this.left = left;
        this.id = id;
        if(this.el) {
            this.init()
        }
    }
    init() {
        let d = document.createDocumentFragment();
        d.appendChild(document.createElement('div'));
        d.childNodes[0].id = this.id
        d.childNodes[0].style.cssText = `position: absolute;padding: 10px;color:#fff;background: #4285f4;transition: all 0.5s;opacity: 0;top:${this.top}px;left:${this.left}px`
        d.childNodes[0].innerHTML = this.str;
        this.el.appendChild(d)
        setTimeout(()=>{
           document.querySelector(`#${this.id}`).style.opacity = 1
        },20)
    }
}

function initL(el,str,cb,t){
    return new Promise((res)=>{
        new Line(el,str,res,t,cb)
    })
}
function initP(el,s,e) {
    return new Promise((res)=>{
        new Pointer(el,s,e,res)
    })
}

function initS(el,str,id,top=0,left=0,res) {
    new Step(el,str,id,top,left,res)
}

window.onload = function() {
    let q = window.self.location.search.split('=')[1];
    q = !!q?q:'警告!电脑将在1分钟内爆炸...'
    document.title = decodeURI(q);
    setTimeout(()=>{
        initP('.po',25,450).then(()=>{
            return initL('.ht','https://www.google.com.hk',initS.bind(null,'.wrap','首先，输入Google网址','dx1',42,400),70)
        }).then(()=>{
            return initP('.po',244,260)
        }).then(()=>{
            let str = window.self.location.search.split('=')[1];
            str = !!str?str:'警告!电脑将在1分钟内爆炸...'
            return initL('.in',decodeURI(q),initS.bind(null,'.wrap','其次，输入你的问题','dx2',262,184))
        }).then(()=>{
            initP('.po',300,428);
            setTimeout(()=>{
                document.querySelector('.click').style.display = 'inherit'
                document.querySelector('.sss').setAttribute('href',`https://www.google.com.hk/search?q=${q}`)
            },1000)
        })
    },200)
}