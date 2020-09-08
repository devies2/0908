var openGnb = document.querySelector('.open-gnb')
var elHeader = document.querySelector('#header')
var elSection = document.querySelector('#section')
var elOutlayer = document.querySelector('.outlayer')
var elNav = document.querySelector('.nav')

function openNav() {
    elHeader.classList.toggle('on')
    elOutlayer.classList.toggle('on')
}
openGnb.addEventListener('click', openNav)
elOutlayer.addEventListener('click', openNav)

function winResize() {
    var winWidth = this.innerWidth
    console.log(this.pageXOffset)
    if ( winWidth > 800 ) {
        elHeader.classList.remove('on')
        elOutlayer.classList.remove('on')
    }
}

window.addEventListener('resize', winResize)

