// toggle navbar
$(document).ready(function () {
  const burger = $(".burger");
  const nav = $(".nav-links");
  const navLinks = $(".nav-links li");

  burger.on("click", function () {
    nav.toggleClass("nav-active");
    burger.toggleClass("toggle");
  });

  navLinks.each(function () {
    $(this).on("click", function () {
      nav.removeClass("nav-active");
      burger.removeClass("toggle");
    });
  });
});

// ////////////////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function () {
  const fromDateInput = $("#FormControlInput3");
  const toDateInput = $("#FormControlInput4");
  const selectNightsInput = $("#FormControlInput5");

  // Populate nights select element
  for (let i = 0; i < 31; i++) {
    selectNightsInput.append(`<option value="${i + 1}">${i + 1}</option>`);
  }

  // Calculate number of nights and update nights select element and check-out date input
  function updateNights() {
    const fromDate = new Date(fromDateInput.val());
    const nights = selectNightsInput.val();
    const toDate = new Date(fromDate.getTime() + nights * 86400000);
    toDateInput.val(toDate.toISOString().substr(0, 10));
  }

  // Update check-in and check-out dates whenever the nights select element is changed
  selectNightsInput.on("change", updateNights);

  // Update nights select element and check-out date input whenever the check-in or check-out date is changed
  fromDateInput.on("change", updateNights);
  toDateInput.on("change", function () {
    const toDate = new Date(toDateInput.val());
    const fromDate = new Date(fromDateInput.val());
    const nights = Math.ceil((toDate - fromDate) / (1000 * 60 * 60 * 24));
    selectNightsInput.val(nights);
    updateNights();
  });

  // ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const autocompleteContainer1 = $("#autocomplete-container1");
  const selectTextInput1 = $("#FormControlInput1");
  const items1 = ["cairo", "Alexandria", "Beheira", "Suez", "Aswan", "Giza"];

  const autocompleteContainer2 = $("#autocomplete-container2");
  const selectTextInput2 = $("#FormControlInput7");
  const items2 = [
    { country: "Algeria", flag: "./img/algeria.png" },
    { country: "Egypt", flag: "./img/egypt.png" },
    { country: "Tunisia", flag: "./img/tunisia.png" },
  ];

  function completeFunction(autocompleteContainer, selectTextInput, items, flag) {
    return function () {
      const inputText = $(this).val();
      autocompleteContainer.html("");
      if (inputText.length > 0) {
        items.forEach(function (item) {
          if (flag) {
            if (item.country.toLowerCase().startsWith(inputText.toLowerCase())) {
              const div = $("<div>");
              div.html(`
                <img src="${item.flag}" class="me-2 flag"/>
                <strong>${item.country.substr(0, inputText.length)}</strong>${item.country.substr(inputText.length)}
              `);
              div.on("click", function () {
                selectTextInput.val(item.country);
                autocompleteContainer.html("");
              });
              autocompleteContainer.append(div);
            }
          } else {
            if (item.toLowerCase().startsWith(inputText.toLowerCase())) {
              const div = $("<div>");
              div.html(
                `<strong>${item.substr(0, inputText.length)}</strong>${item.substr(inputText.length)}`
              );
              div.on("click", function () {
                selectTextInput.val(item);
                autocompleteContainer.html("");
              });
              autocompleteContainer.append(div);
            }
          }
        });
      }
    };
  }

  selectTextInput1.on(
    "input",
    completeFunction(autocompleteContainer1, selectTextInput1, items1, false)
  );

  selectTextInput2.on(
    "input",
    completeFunction(autocompleteContainer2, selectTextInput2, items2, true)
  );
});
