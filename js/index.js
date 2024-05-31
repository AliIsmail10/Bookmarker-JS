var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var boxConent = document.getElementById("boxConent");
var closeBtn = document.getElementById("closeBtn");
var overlay = document.getElementById("overlay");

siteList = [];
if (localStorage.getItem("AllSiteList")) {
  siteList = JSON.parse(localStorage.getItem("AllSiteList"));
  display();
}
function addSite() {
  if (validateIputs(siteName) && validateIputs(siteUrl)) {
    var site = {
      name: siteName.value,
      url: siteUrl.value,
    };
    siteList.push(site);

    localStorage.setItem("AllSiteList", JSON.stringify(siteList));
    display();
    clear();
    closeModal();
  } else {
    openModal();
  }
}

closeBtn.addEventListener("click", function () {
  closeModal();
});

function clear() {
  siteName.value = "";
  siteUrl.value = "";
  siteName.classList.remove("is-valid", "is-invalid");
  siteUrl.classList.remove("is-valid", "is-invalid");
  siteName.nextElementSibling.classList.add("d-none");
  siteUrl.nextElementSibling.classList.add("d-none");
}

function display() {
  box = "";
  for (var i = 0; i < siteList.length; i++) {
    box += ` <tr>
      <th scope="row" class="pt-3">${i + 1}</th>
      <td class="pt-3">${siteList[i].name}</td>
      <td><button class="btn btn-visit pe-2" id="visit" onclick="visitSite(${i})"><i class="fa-solid fa-eye pe-2"></i>Visit</button></td>
      <td><button class="btn btn-delete pe-2" id="delete" onclick="deleteSite(${i})"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
    </tr>`;
  }
  document.getElementById("tBody").innerHTML = box;
}

function deleteSite(index) {
  siteList.splice(index, 1);
  localStorage.setItem("AllSiteList", JSON.stringify(siteList));
  display();
}

function visitSite(index) {
  window.open(siteList[index].url, "_blank");
}

function validateIputs(element) {
  var regx = {
    siteName: /^[A-z]?\w{3,15}\s?(\w{3,15})?\s?$/,
    siteUrl:
      /^((https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\/\\\S*)?\.(com|edg|org))\/?$/,

    // /^((https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+\.(com|edg|org)(\/\S*)?)$/
    // /(https?:\/\/)?(www.)?(\w+).(com|edg|org):?.*/gi
    // /(https?:\/\/)?(www.)?[A-Za-z]{3,15}.(com|edg|org):  /gi
  };
  if (regx[element.id].test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.add("d-none");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    element.nextElementSibling.classList.remove("d-none");
    return false;
  }
}
/* =============jq============ */
function openModal() {
  overlay.classList.remove("d-none");
  boxConent.classList.remove("d-none");

  // jQuery animation
  $(boxConent).animate(
    {
      width: "450px",
    },
    200,
    function () {
      $(this).animate(
        {
          height: "250px",
        },
        300
      );
    }
  );
}

function closeModal() {
  $(boxConent).animate(
    {
      height: "0px",
    },
    200,
    function () {
      $(this).animate(
        {
          width: "0px",
        },
        300,
        function () {
          overlay.classList.add("d-none");
          boxConent.classList.add("d-none");
        }
      );
    }
  );
}
