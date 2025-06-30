document.addEventListener('DOMContentLoaded', function () {
    const scrollBtn = document.querySelector('.scroll-to-top');
    const footer = document.querySelector('footer');
  
    scrollBtn.style.display = "none";
    scrollBtn.style.position = "fixed";
    scrollBtn.style.right = "20px";
    scrollBtn.style.bottom = "20px";
  
    function updateButtonPosition() {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const footerTop = footer.getBoundingClientRect().top + window.scrollY;
  
      // if (window.innerWidth >= 1024) {
      //   scrollBtn.style.display = "block";
      //   scrollBtn.style.bottom = "188px";
      //   return;
      // }
  
      if (scrollY > 100) {
        scrollBtn.style.display = "block";
      } else {
        scrollBtn.style.display = "none";
      }
  
      if (scrollY + windowHeight >= footerTop) {
        scrollBtn.style.bottom = "20px";
        scrollBtn.style.position = "absolute";
      } else {
        scrollBtn.style.position = "fixed";
        scrollBtn.style.bottom = "20px";
      }
    }
  
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  
    window.addEventListener('scroll', updateButtonPosition);
    window.addEventListener('resize', updateButtonPosition);
    updateButtonPosition();
  });