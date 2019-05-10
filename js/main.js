var petid="";

function getData() {
  $.ajax({
    url: "https://jquerycrud-ed8dc.firebaseio.com/agus.json",
    type: "GET",
    success: function (response) {
      printData(response);
      console.log(response);
    }
  });
}

function printData(dataToPrint) {
  $(".pet-wrapper").empty();
  $.each(dataToPrint, (key, value) => {
      $(".pet-wrapper").append(
          `<div class="col col-sm-6 col-md-4 mb-4" data-id="${key}">
              <div class="card">
                  <img src="${value.image}" class="card-img-top" alt="...">
                  <div class="card-body">${value.name}</h5>
                      <p class="card-text">${value.description}</p>
                      <a href="javascript:"  class="adopt btn btn-primary">¡Adoptar!</a>
                  </div>
              </div>
          </div>`
      )
  })
  //console.log()
  $(".adopt").click((event) => {
      petid = $(event.target).parent().parent().parent().data("id");
      loadHTML("./views/adopt.html");
      //deleteData(id);
      //$(event.target).parent().parent().parent().fadeOut("fast", () => {});
  });
}

function postData(postObject) {
  $.post("https://jquerycrud-ed8dc.firebaseio.com/agus.json", JSON.stringify(postObject), function (data) {
    console.log(data);
  }, "json");
}

function updateData() {
  $.ajax({
    url: 'https://jquerycrud-ed8dc.firebaseio.com/agus/-LeJgLYcUIR1OwHL49pW.json',
    type: 'PUT',
    data: JSON.stringify(postObject),
    success: function (response) {
      console.log(response)
    }
  });
}

function deleteData(id) {
  $.ajax({
    url: `https://jquerycrud-ed8dc.firebaseio.com/agus/${id}.json`,
    type: 'DELETE',
    success: function (response) {
      console.log(response)
    }
  });
}

function loadHTML(file) {
  $("#content-wrapper").removeClass("animated fadeInRight faster");
  $("#content-wrapper").width('auto')
  $("#content-wrapper").load(file, () => {
    getData();

  })
  $("#content-wrapper").addClass("animated fadeInRight faster");
}
loadHTML("./views/index.html");

$(".nav-item").click((event) => {
  event.preventDefault();
  $('.navbar-toggler').trigger("click")
  loadHTML($(event.target).attr("href"))
})

function validateInput(forminput) {
  $(forminput).removeClass("border-danger")
  $(forminput).removeClass("border-succes")
  if ($(forminput).val() === "") {
    $(forminput).addClass("border-danger")
    $("<p class='text-danger error animated fadeInLeft faster'>No olvides llenarme</p>").insertAfter(forminput);
    return false;
  } else {
    $(forminput).addClass("border-success")
    return $(forminput).val()
  }
}

function validateForm() {
  $(".error").remove()
  let name = validateInput("#pet-name");
  let description = validateInput("#pet-description");
  let image = validateInput("#pet-image");
  if (name && description && image) {

    let petObject = {
      name,
      description,
      image
    };
    return petObject
  } else {
    return false
  }
}

function enviar() {
  let result = validateForm();
  if (!result) {
    $("#submit").removeClass("animated shake faster").width('100%').addClass("animated shake faster")
  } else {
    $("#submit").fadeOut();
    $("form").append('<div class="alert alert-success  animated bounceInDown" role="alert">Gracias buen hombre</div>')
    postData(result)
    setTimeout(()=> {
      loadHTML("./views/index.html")
    },2000);
  }
}
function validateAdoptionForm() {
  $(".error").remove()
  let name = validateInput("#adoptant-name");
  let phone = validateInput("#adoptant-phone");
  let email = validateInput("#adoptant-email");
  if (name && phone && email) {
    let adoptantObject = {
      name,
      phone,
      email
    };
    return adoptantObject
  } else {
    return false
  }
}
function adoptar() {
  let result = validateAdoptionForm();
  if (!result) {
    $("#submit").removeClass("animated shake faster").width('100%').addClass("animated shake faster")
  } else {
    $("#submit").fadeOut();
    deleteData(petid);
    $("form").append(`
    <div class="alert alert-success animated bounceInDown" role="alert">Gracias de todo CORAZON
    <span class="animated infinite zoomIn heartBeat delay-2s">&hearts;</span><br>
    Nos pondermos en contacto contigo<br>
    <a href="javascript:" onclick="loadHTML('./views/index.html');">Ver mas adopciones</a>
    </div>`
    )

  }
}