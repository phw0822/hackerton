let selectedHeight = null; // 선택된 키
let selectedRace = null; // 선택된 인종
let defaultHeight = "Medium"; // 기본값: 중간 키
let defaultRace = "Apricot"; // 기본값: 살구색 인종
let defaultEyes = "흑안"; // 기본값: 검정 눈
let defaultHair = "노란색";
// 키와 인종에 맞는 이미지 경로 설정
const imagePaths = {
  High: {
    Black: "img/black_high.png",
    Apricot: "img/apricot_high.png",
    White: "img/white_high.png",
  },
  Medium: {
    Black: "img/black_medium.png",
    Apricot: "img/apricot_medium.png",
    White: "img/white_medium.png",
  },
  Short: {
    Black: "img/black_short.png",
    Apricot: "img/apricot_short.png",
    White: "img/white_short.png",
  },
  eyes: {
    흑안: "img/eyes1.png",
    회색눈: "img/eyes2.png",
    "벽안(파랑)": "img/eyes3.png",
    녹안: "img/eyes4.png",
    황안: "img/eyes5.png",
  },
  hair: {
    흰색: "img/hair4.png",
    검정: "img/hair3.png",
    갈색: "img/hair2.png",
    노란색: "img/hair1.png",
  },
};

const data = {
  eyes: {
    흑안: {
      OCA2: "매우 높음",
      HERC2: "높음",
      설명: "멜라닌 생산이 극도로 높아 검은색으로 나타남",
    },
    녹안: {
      OCA2: "중간",
      HERC2: "중간",
      설명: "갈색과 파란색 사이의 멜라닌 양으로 초록색 형성",
    },
    "벽안(파랑)": {
      OCA2: "낮음",
      HERC2: "낮음",
      설명: "멜라닌 생산이 적어 파란색으로 나타남",
    },
    회색눈: {
      OCA2: "낮음",
      HERC2: "중간",
      설명: "멜라닌 생산이 적고 빛의 산란으로 회색이 나타남",
    },
    황안: {
      OCA2: "중간",
      HERC2: "중간",
      설명: "멜라닌의 특정 변형으로 노란색이 나타남",
    },
  },
  body: {
    Black: {
      MC1R: "높음",
      SLC24A5: "낮음",
      SLC45A2: "낮음",
      TYR: "높음",
      OCA2: "높음",
    },
    Apricot: {
      MC1R: "중간",
      SLC24A5: "중간",
      SLC45A2: "중간",
      TYR: "중간",
      OCA2: "중간",
    },
    White: {
      MC1R: "낮음",
      SLC24A5: "높음",
      SLC45A2: "높음",
      TYR: "낮음",
      OCA2: "낮음",
    },
  },
  height: {
    // Height 카테고리 추가
    High: {
      FGFR3: "낮음",
      GH1: "높음",
      설명: "큰 키 유전자 발현",
    },
    Medium: {
      FGFR3: "평균",
      GH1: "평균",
      설명: "평균 키 유전자 발현",
    },
    Short: {
      FGFR3: "높음",
      GH1: "낮음",
      설명: "작은 키 유전자 발현",
    },
  },
  hair: {
    // Hair 카테고리 추가
    흰색: {
      MC1R: "낮음",
      ASIP: "낮음",
      설명: "멜라닌 생산이 거의 없어서 흰색 머리로 나타남",
    },
    검정: {
      MC1R: "높음",
      ASIP: "높음",
      설명: "멜라닌이 많이 생산되어 검정 머리로 나타남",
    },
    갈색: {
      MC1R: "중간",
      ASIP: "중간",
      설명: "갈색 멜라닌이 중간 정도 생산됨",
    },
    노란색: {
      MC1R: "낮음",
      ASIP: "중간",
      설명: "멜라닌이 적어 노란색으로 나타남",
    },
  },
};

document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab");
  const optionGrids = document.querySelectorAll(".options-grid");
  const attributeBoxes = document.querySelectorAll(".attribute-box");

  // 캐릭터의 눈, 몸, 머리 요소를 가져옴
  const characterEyes = document.getElementById("character-eyes");
  const characterBody = document.getElementById("character-body");
  const characterHair = document.getElementById("character-hair");

  if (!characterEyes || !characterBody || !characterHair) {
    console.error("캐릭터의 눈, 몸 또는 머리 요소를 찾을 수 없습니다.");
    return;
  }

  // 이미지 경로 설정
  const imagePaths = {
    eyes: {
      흑안: "img/eyes1.png",
      녹안: "img/eyes2.png",
      "벽안(파랑)": "img/eyes3.png",
      회색눈: "img/eyes4.png",
      황안: "img/eyes5.png",
    },
    body: {
      Black: "img/black2.png",
      Apricot: "img/apricot2.png",
      White: "img/white2.png",
    },
    hair: {
      흰색: "img/hair4.png",
      검정: "img/hair3.png",
      갈색: "img/hair2.png",
      노란색: "img/hair1.png",
    },
    height: {
      // Height 이미지 경로 추가
      High: "img/height_high.png",
      Medium: "img/height_medium.png",
      Short: "img/height_short.png",
    },
  };

  // 탭 전환 기능
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.getAttribute("data-target");

      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      optionGrids.forEach((grid) => {
        grid.classList.remove("active");
        if (grid.id === target) {
          grid.classList.add("active");
        }
      });
    });
  });

  // 옵션 클릭 시 속성 및 데이터 표시
  const options = document.querySelectorAll(".option-item");
  options.forEach((option) => {
    option.addEventListener("click", () => {
      const category = document
        .querySelector(".tab.active")
        .getAttribute("data-target")
        .replace("-options", "");

      const selectedAttribute = option.querySelector("span").textContent.trim();
      const selectedImage = option.querySelector("img").src;

      // 해당 속성 카테고리에 맞는 박스 찾기
      let targetBox;
      switch (category) {
        case "eyes":
          targetBox = attributeBoxes[0];
          if (characterEyes) {
            characterEyes.src = imagePaths.eyes[selectedAttribute];
          }
          break;
        case "body":
          targetBox = attributeBoxes[3];
          if (characterBody) {
            characterBody.src = imagePaths.body[selectedAttribute];
          }
          break;
        case "hair": // Hair 카테고리 처리
          targetBox = attributeBoxes[2];
          if (characterHair) {
            characterHair.src = imagePaths.hair[selectedAttribute];
          }
          break;
        case "height": // Height 카테고리 처리
          targetBox = attributeBoxes[1];
          if (targetBox) {
            // Height 속성 데이터 표시
            const contentBox = targetBox.querySelector(".attribute-content");
            contentBox.innerHTML = `<span>${selectedAttribute}</span>`;
          }
          break;
        default:
          targetBox = null;
      }

      // 속성 데이터 표시
      const attributeData = data[category][selectedAttribute];
      let dataHTML = "";
      for (const key in attributeData) {
        dataHTML += `<p><strong>${key}:</strong> ${attributeData[key]}</p>`;
      }

      if (targetBox) {
        const contentBox = targetBox.querySelector(".attribute-content");
        contentBox.innerHTML = `<img src="${selectedImage}" alt="icon" class="attribute-icon"><span>${selectedAttribute}</span>${dataHTML}`;
      }
    });
  });

  // 처음 로드 시 첫 번째 옵션을 기본값으로 표시
  document.querySelector(".option-item").click();
});
document.addEventListener("DOMContentLoaded", () => {
  const characterBody = document.getElementById("character-body");

  const options = document.querySelectorAll(".option-item");
  options.forEach((option) => {
    option.addEventListener("click", () => {
      const category = document
        .querySelector(".tab.active")
        .getAttribute("data-target")
        .replace("-options", "");

      const selectedAttribute = option.querySelector("span").textContent.trim();

      // 선택한 키 처리
      if (category === "height") {
        selectedHeight = selectedAttribute;
      }

      // 선택한 인종 처리
      if (category === "body") {
        selectedRace = selectedAttribute;
      }

      // 키와 인종이 모두 선택되었을 때 이미지 업데이트
      if (selectedHeight && selectedRace) {
        const bodyImage = imagePaths[selectedHeight][selectedRace];
        if (bodyImage) {
          characterBody.src = bodyImage; // 캐릭터의 몸 이미지 업데이트
        }
      }
    });
  });

  // 처음 로드 시 첫 번째 옵션을 기본값으로 표시
  document.querySelector(".option-item").click();
});
document.addEventListener("DOMContentLoaded", () => {
  const characterEyes = document.getElementById("character-eyes");
  const characterBody = document.getElementById("character-body");
  const characterHair = document.getElementById("character-hair");

  // 기본값 설정 (검정 눈, 중간 키, 노란 머리, 살구색 인종)
  characterEyes.src = imagePaths.eyes[defaultEyes]; // 검정 눈 이미지 설정
  characterHair.src = imagePaths.hair[defaultHair]; // 노란 머리 이미지 설정
  characterBody.src = imagePaths[defaultHeight][defaultRace]; // 중간 키, 살구색 인종 이미지 설정

  // 옵션 클릭 시 속성 및 데이터 표시
  const options = document.querySelectorAll(".option-item");
  options.forEach((option) => {
    option.addEventListener("click", () => {
      const category = document
        .querySelector(".tab.active")
        .getAttribute("data-target")
        .replace("-options", "");

      const selectedAttribute = option.querySelector("span").textContent.trim();

      // 선택한 속성에 따라 이미지 업데이트
      switch (category) {
        case "eyes":
          defaultEyes = selectedAttribute;
          characterEyes.src = imagePaths.eyes[defaultEyes];
          break;
        case "body":
          defaultRace = selectedAttribute;
          characterBody.src = imagePaths[defaultHeight][defaultRace];
          break;
        case "hair":
          defaultHair = selectedAttribute;
          characterHair.src = imagePaths.hair[defaultHair];
          break;
        case "height":
          defaultHeight = selectedAttribute;
          characterBody.src = imagePaths[defaultHeight][defaultRace];
          break;
      }
    });
  });

  // 처음 로드 시 첫 번째 옵션을 기본값으로 표시
  document.querySelector(".option-item").click();
});
