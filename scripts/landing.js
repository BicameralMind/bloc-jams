/*

var pointsArray = document.getElementsByClassName('point');

var animatePoints = function(points) {
    
    var revealPoint = function(point) {
        point.style.opacity = 1;
        point.style.transform = "scaleX(1) translateY(0)";
        point.style.msTransform = "scaleX(1) translateY(0)";
        point.style.WebkitTransform = "scaleX(1) translateY(0)";
    }
    
//    for(var i =0; i < points.length; i++) {
//        revealPoint(i);
//    }
    
    forEach(points, revealPoint);
};


window.onload = function() {
    //automatically animate the points on a tall screen where scrolling can't trigger animation
    if (window.innerHeight > 950) {
        animatePoints(pointsArray);
    }
    
    var sellingPoints = document.getElementsByClassName('selling-points')[0];
    var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;
    
    window.addEventListener('scroll', function(event) {
        if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
            animatePoints(pointsArray);
        }
     });
}

*/

/*

var animatePoints = function() {
    var revealPoint = function() {
        $(this).css({
             opacity: 1,
             transform: 'scaleX(1) translateY(0)'
         });
     };
    
    $.each($('.point'), revealPoint);  
};

$(window).load(function() {
   if ($(window).height() > 950) {
         animatePoints();
   }
   
   var scrollDistance = $('.selling-points').offset().top - $(window).height() + 200;
    
   $(window).scroll(function(event) {
       if ($(window).scrollTop() >= scrollDistance) {
             animatePoints();
       }
    });
    
});

*/

var animatePoints = function() {
    var revealPoint = function() {
        $(this).css({
            opacity: 1,
            transform: 'scaleX(1) translateY(0)'
        });
    };
    $.each($('.point'), revealPoint);
};

$(window).load(function() {
     if ($(window).height() > 950) {
         animatePoints();
     }
    
    var scrollDistance = $('.selling-points').offset().top - $(window).height() + 200;
    
    $(window).scroll(function(event) {
         if ($(window).scrollTop() >= scrollDistance) {
             animatePoints();
         }
    });
});

