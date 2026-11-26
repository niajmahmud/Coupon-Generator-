
const nameInput = document.querySelector("#nameIn");
const descriptionInput = document.querySelector("#description");
const validityInput = document.querySelector("#validity");
const btn = document.querySelector("#genbtn"); 
const foreverBtn = document.querySelector("#foreverBtn"); 

const cpnName = document.querySelector("#couponTitle"); 
const cpndesc = document.querySelector("#couponDescription"); 
const cpndate = document.querySelector("#couponValidity");

const charCount = document.querySelector("#charCount");

const maxCharacters = 60;

descriptionInput.addEventListener("input", () => {
    charCount.textContent =
        `${descriptionInput.value.length} / ${maxCharacters} characters`;
});

btn.addEventListener("click", (evt)=>{
    evt.preventDefault(); 

    console.log(nameInput.value);
    cpnName.textContent = nameInput.value; 
    console.log(cpnName.textContent)

console.log(descriptionInput.value);
     cpndesc.textContent = descriptionInput.value; 


if(!validityInput.disabled){
    console.log(validityInput.value);
    cpndate.textContent = validityInput.value;
    
}else{
    console.log("Forever"); 
     cpndate.textContent = "Forever"; 
}

document.querySelector("#coupon").style.display = "block"; 

document.querySelector("#sendCoupon").style.display = "block";
})

foreverBtn.addEventListener("click", (evt)=>{
    evt.preventDefault(); 

    validityInput.disabled = !validityInput.disabled; 

    if(validityInput.disabled){
          validityInput.value = ""; 
     foreverBtn.textContent = "Forever <3"
    
    
    }
    else{
        foreverBtn.textContent = "Forever"; 
     
    }
    
  
}); 
const sendCouponBtn = document.querySelector("#sendCoupon");

sendCouponBtn.addEventListener("click", () => {
    const svg = document.querySelector("#coupon");

    // Clone the SVG
    const svgClone = svg.cloneNode(true);

    // Copy CSS styles into the cloned SVG elements
    const originalElements = [
        svg,
        ...svg.querySelectorAll("*")
    ];

    const clonedElements = [
        svgClone,
        ...svgClone.querySelectorAll("*")
    ];

    originalElements.forEach((element, index) => {
        const styles = window.getComputedStyle(element);

        clonedElements[index].style.cssText =
            element.style.cssText;

        clonedElements[index].setAttribute(
            "fill",
            styles.fill
        );

        clonedElements[index].setAttribute(
            "stroke",
            styles.stroke
        );

        clonedElements[index].setAttribute(
            "stroke-width",
            styles.strokeWidth
        );

        clonedElements[index].setAttribute(
            "stroke-dasharray",
            styles.strokeDasharray
        );

        clonedElements[index].setAttribute(
            "font-size",
            styles.fontSize
        );

        clonedElements[index].setAttribute(
            "font-weight",
            styles.fontWeight
        );

        clonedElements[index].setAttribute(
            "text-anchor",
            styles.textAnchor
        );
        clonedElements[index].setAttribute("font-family", "'Segoe Print', cursive");
    });

    // Convert SVG to a string
    const svgData = new XMLSerializer()
        .serializeToString(svgClone);

    const svgBlob = new Blob([svgData], {
        type: "image/svg+xml;charset=utf-8"
    });

    const url = URL.createObjectURL(svgBlob);

    const img = new Image();

    img.onload = () => {
        const canvas = document.createElement("canvas");

        canvas.width = 1000;
        canvas.height = 600;

        const ctx = canvas.getContext("2d");

        ctx.drawImage(img, 0, 0, 1000, 600);

        canvas.toBlob((blob) => {
            if (!blob) {
                alert("Sticker creation failed!");
                URL.revokeObjectURL(url);
                return;
            }

            const downloadUrl = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = downloadUrl;
            link.download = "my-coupon-sticker.png";

            link.click();

            URL.revokeObjectURL(downloadUrl);
            URL.revokeObjectURL(url);
        }, "image/png");
    };

    img.onerror = () => {
        alert("Could not convert the coupon into a sticker.");
        URL.revokeObjectURL(url);
    };

    img.src = url;
});
