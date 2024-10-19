document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(
    ".second-section, .third-section, .fourth-section, .fifth-section, .sixth-section"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1, // 섹션의 30%가 보이면 애니메이션 실행
    }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
});
