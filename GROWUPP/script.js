var ctrh, ctrw;

if (window.innerWidth > 500) {
  ctrh = 1.5;
  ctrw = .7;
}
else {
  ctrh = 1.2;
  ctrw = 2.2;
}

function locoAndScrollInitialize() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
    tablet: { smooth: true },
    smartphone: { smooth: true }
  });
  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight
      };
    }
  });


  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  ScrollTrigger.refresh();
}

function textanim() {
  var h1 = document.querySelector("#fs h1")

  var clutter = "";
  var temp = 0;

  for (var i = 0; i <= Math.floor(h1.textContent.length / 2); i++) {
    clutter += `<span data-delay="${i}">${h1.textContent.charAt(temp)}</span>`;
    temp++;
  }
  for (var i = Math.floor(h1.textContent.length / 2) - 1; i >= 0; i--) {
    clutter += `<span data-delay="${i}">${h1.textContent.charAt(temp)}</span>`;
    temp++;
  }

  h1.innerHTML = clutter;

  document.querySelectorAll("h1 span")
    .forEach(function (elem) {
      gsap.to(elem, {
        y: 0,
        ease: Expo.easeInOut,
        duration: 1.8,
        delay: elem.dataset.delay * .15
      })
    })
}

function animateCubeSize() {
  var tl = gsap.timeline();
    
  // animating cube images
  gsap.to("#cube img", {
    stagger: 1,
    opacity: 1,
    duration: .8 * 3,
    ease: Expo.easeInOut
  })

  // animating cube size

  tl.to("#fs #cube", {
    width: "30%",
    delay: .5,
    ease: Power3.easeInOut,
    duration: .8
  })
    .to("#fs #cube", {
      height: `${30 * ctrh}%`,
      width: `${ctrw * 40}%`,
      ease: Power3.easeInOut,
      duration: .8
    })
    .to("#fs #cube", {
      height: `${20 * 2}%`,
      width: `${ctrw * 30}%`,
      ease: Power3.easeInOut,
      duration: .8
    })
    .to("#fs h1 span", {
      y: "-150%",
      ease: Expo.easeInOut,
      duration: 1
    })
    .to("#fs #cube", {
      height: "100%",
      width: "100%",
      delay: -.7,
      ease: Circ.easeInOut,
      onComplete: function () {
        document.querySelector("#fs").style.display = "none";
        animateAllHeadings();
      },
      duration: 1
    })
}
let image = document.getElementById('image200');
        let images = ['assets/img/Nerd-amico.png', 'assets/img/Knowledge-pana.png','assets/img/Dictionary-pana.png']
        setInterval(function () {
            let random = Math.floor(Math.random() * 3);
            image.src = images[random];
        }, 800);



locoAndScrollInitialize();
textanim();
animateCubeSize();
