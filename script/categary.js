let store = document.querySelector(".records");
data_show();
function data_show() {
  fetch("../data/all_blogs.json")
    .then((response) => response.json())
    .then((data) => {
      // display_data();

      let statement = "";

      for (let i in data) {
        statement += `<div class="blog  ${data[i].categary} blog-${i}"  >
        <div class="blog-image">
            <img src="${data[i].path + i}.jpg" alt="place image" />
            <div class="blog-content">
                <h5 class="blog-title">${data[i].title + i}</h5>
                <p class="blog-date">${data[i].date}</p>
            </div>
            
            <div class="blog-condition">
                <div class="blog-left-side">
                    <i class="fa-solid fa-thumbs-up"></i> ${
                      data[i].like * (i + 1)
                    }
                    <i class="fa-solid fa-share"></i> ${data[i].share + i * 2}
                </div>
                <div><i class="fa-solid fa-comment"></i> ${
                  data[i].comment * i
                }</div>
            </div>
        </div>
    </div>

            `;
      }

      store.innerHTML = statement;
    });
}

function filter_data(value = "all") {
  let buttons = document.querySelectorAll(".buttons .button");

  buttons.forEach((button) => {
    if (value.toLowerCase() == button.innerText.toLowerCase()) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });

  let items = document.querySelectorAll(".records .blog");
  items.forEach((item) => {
    if (value == "all") {
      item.classList.remove("hide");
    } else {
      if (item.classList.contains(value)) {
        item.classList.remove("hide");
        console.log("hellow");
      } else {
        item.classList.add("hide");
      }
    }
  });

  if(value == "filter_data"){
    let search_btn = document.getElementById("search-btn");
  let search_input = document.getElementById("search");

  search_btn.addEventListener("click", () => {
    let search_word = search_input.value.toLowerCase();
    console.log(search_word, typeof search_word);
    items.forEach((item) => {
      let all_title = item.querySelectorAll(".blog-title");

      if (all_title[0].innerText.includes(search_word)) {
        item.classList.remove("hide");
      } else {
        console.log(all_title[0].innerText, typeof all_title[0].innerText);
        item.classList.add("hide");
      }
    });
  });
  }
  
}

window.onloadeddata = () => {
  filter_data();
};

// ================================== search ===========================

// let searchInput = document.getElementById("search");
// let all_blogs = document.querySelectorAll(".records .blog");

// searchInput.addEventListener("input", (e) => {
//   records.innerHTML = "";

//   let searchWord = e.target.value.toLowerCase();
//   console.log(searchWord);
//   all_tr.forEach((tr) => {
//     let all_td = tr.querySelectorAll("td");

//     if (all_td[1].innerText.toLowerCase().indexOf(searchWord) > -1) {
//       records.appendChild(tr);
//       all_td[2].classList.add("red");
//     }
//   });
//   if (records.innerHTML == "") {
//     records.innerHTML = "record are not found please try again ";
//   }
// });
