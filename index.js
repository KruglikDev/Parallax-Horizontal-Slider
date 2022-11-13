let images = [...document.querySelectorAll('.slide__img')],
    slider = document.querySelector('.slider'),
    sliderWidth,
    imageWidth,
    current = 0,
    target = 0,
    ease = .05

images.forEach((img, i) => {
    img.style.backgroundImage = `url(./images/${i+1}.png)`;
})

const lerp = (start, end, t) => {
    return start * (1-t) + end * t;
}

const setTransform = (el, transform) => {
    el.style.transform = transform;
}

const init = () => {
    sliderWidth = slider.getBoundingClientRect().width;
    imageWidth = sliderWidth / images.length;
    document.body.style.height = `${sliderWidth - (window.innerWidth - window.innerHeight)}px`;
}

const animateImages = () => {
    let ratio = current / imageWidth;
    let intersectionRatio;

    images.forEach((img, i) => {
        intersectionRatio = ratio - (i * 0.7);
        setTransform(img, `translateX(${intersectionRatio * 70}px)`);
    })
}

const animate = () => {
    current = parseFloat(lerp(current, target, ease)).toFixed(2);
    target = window.scrollY;
    setTransform(slider, `translateX(-${current * 1.5}px)`);
    animateImages();
    requestAnimationFrame(animate);
}

init();
animate();

// window.addEventListener('resize', init);