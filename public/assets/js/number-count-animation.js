
      const counters = document.querySelectorAll(".count-txt");
      const speed = 500;

      counters.forEach((counter) => {
        const animate = () => {
          const value = +counter.getAttribute("auth-count");
          const data = +counter.innerText;

          const time = value / speed;
          if (data < value) {
            counter.innerText = Math.ceil(data + time);
            setTimeout(animate, 1);
          } else {
            counter.innerText = value;
          }
        };

        animate();
      });
 