let currentImage = 0;
let images = [
  { src: "./task2pic1.jpg", alt: "First Image" },
  { src: "./task2pic2.jpg", alt: "Second Image" },
  { src: "./task2pic3.jpg", alt: "Third Image" },
];

$("#next").click(function () {
  $("#fader").fadeOut("slow", function () {
    currentImage = (currentImage + 1) % images.length;
    $(this).attr("src", images[currentImage].src);
    $(this).attr("alt", images[currentImage].alt);
    $(this).fadeIn("slow", function () {});
  });
});

$("#previous").click(function () {
  $("#fader").fadeOut("slow", function () {
    currentImage = (currentImage - 1 + images.length) % images.length;
    $(this).attr("src", images[currentImage].src);
    $(this).attr("alt", images[currentImage].alt);
    $(this).fadeIn("slow", function () {});
  });
});
