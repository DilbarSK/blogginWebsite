// let information_aside = document.getElementById("information-aside");
// console.log("🚀 ~ file: home.js:2 ~ information_aside:", information_aside.offsetHeight)
// let blog_section = document.querySelector(".blog-section");
// console.log("🚀 ~ file: home.js:4 ~ blog_section:", blog_section.offsetHeight)

// blog_section.style.height = information_aside.offsetHeight + "px"
// console.log(information_aside)

let popular_blogs = document.querySelector(".popular-blogs");
let p_blogs = popular_blogs.querySelectorAll(".p-blog");
let popular_blogs_length = p_blogs.length;

let arrows = document.querySelectorAll(".angles button");

let initail = 0;
arrows.forEach((arrow) => {
  arrow.addEventListener("click", (e) => {
    if (e.target.classList.contains("right-arrow")) {
      if (initail == -popular_blogs_length + 3) {
        arrow.setAttribute("disabled");
      } else {
        initail -= 1;
      }
      popular_blogs.style.transform = `translateX(${initail * 280 + "px"}`;
    } else if (e.target.classList.contains("left-arrow")) {
      if (initail == 0) {
        arrow.setAttribute("disabled");
      } else {
        initail += 1;
      }
      popular_blogs.style.transform = `translateX(${initail * 280 + "px"}`;
    }
  });
});

// =========================display blogs records ============================

let home_blogs = document.querySelector(".blog-section");
let page_no = 1;
let records_per_page = 5;
let total_records = 0;
let local_records = JSON.parse(localStorage.getItem("records"));

total_records = local_records;
console.log("line no 45 , total records", total_records);
let total_pages = Math.ceil(total_records / records_per_page);

let select_range = document.querySelector("#range-value");
select_range.addEventListener("change", (e) => {
  records_per_page = select_range.value;
  total_pages = Math.ceil(total_records / records_per_page);

  generatePaginationButtons();
  display_data();
});

display_data();
generatePaginationButtons();

function display_data() {
  fetch("../data/home_blogs.json")
    .then((response) => response.json())
    .then((data) => {
      home_blogs.innerHTML = "";

      let start_index = page_no * records_per_page - records_per_page;
      let end_index = page_no * records_per_page;
      console.log(end_index);
      if (end_index > total_records) {
        end_index = total_records;
      }

      let statement = "";

      for (i = start_index; i < end_index; i++) {
        statement += `
        <div class="blog  blog-${i}">
        <div class="blog-media">
        <video src="${data[i].path}.mp4" controls></video>
        <div class="blog-condition">
        <div class="blog-left-side">
                <i class="fa-solid fa-thumbs-up"></i>
                <i class="fa-solid fa-share"></i>
                </div>
                <div><i class="fa-solid fa-comment"></i> Comment</div>
                </div>
                </div>
                <div class="blog-content">
                <h1 class="blog-title">Blog title (${
                  data[i].title + (i + 1)
                })</h1>
            <p class="blog-text">${data[i].text + (i + 1)}
            </p>
            <button class="btn blog-btn" id="">
            see more <i class="fa-solid fa-arrow-right"></i>
            </button>
            </div>
            </div>
            `;
      }
      home_blogs.innerHTML = statement;
    });
}

function generatePaginationButtons() {
  let paginationEl = document.querySelector(".pagination-buttons");

  let prev_Btn = `
<button class="fa-solid fa-angle-left" id="prevBtn" onclick="prevF()"></button>`;
  let next_Btn = `
<button class="fa-solid fa-angle-right" id="nextBtn" onclick="nextF()"></button>`;

  let pagination_buttons = "";
  for (x = 1; x <= total_pages; x++) {
    pagination_buttons += `
  <button class="pagination-btn btn-${x}">${x}</button>
`;
  }

  paginationEl.innerHTML = ` ${prev_Btn} ${pagination_buttons}${next_Btn}`;
}

function prevF() {
  if (page_no == 1) {
    document.getElementById("prevBtn").setAttribute("disabled");
  }
  page_no--;
  display_data();
}

function nextF() {
  if (page_no == total_pages) {
    document.getElementById("nextBtn").setAttribute("disabled");
  }
  page_no++;
  display_data();
}

let page_buttons = document.querySelectorAll(".pagination-btn");
page_buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    page_no = e.target.innerHTML;
    display_data();
  });
});

// ================================= display last year data=============================

let last_year_blogs = document.querySelector(".last-year");

display_last_year_data();

function display_last_year_data() {
  fetch("../data/home_last_year.json", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // display_data();

      let statement = "";

      for (let x in data) {
        statement += `<div class="p-blog p-blog${i + 1}">
        <div class="p-blog-image">
          <img src="${data[x].path + x}.png" alt="place image" />
          <div class="blog-condition">
            <div class="blog-left-side">
              <i class="fa-solid fa-thumbs-up"></i>${data[x].like}
              <i class="fa-solid fa-share"></i> ${data[x].share}
            </div>
            <div><i class="fa-solid fa-comment"></i> ${data[x].comment}</div>
          </div>
        </div>
        <div class="p-blog-content">
          <p class="p-blog-heading">Lorem ipsum dolor sit amet.</p>
          <p class="p-blog-date">${data[x].date}</p>
        </div>
      </div>
            `;
      }

      last_year_blogs.innerHTML = statement;
    });
}
