//sexport const api_url='https://aldandev.azurewebsites.net/api/';


//Local Test URL Daniel
export const api_url = 'https://localhost:5001/api/';
//export const img_path = "http://localhost:4200/assets/images/";

export const company_id = 10;

//images Server if we serve them
export const img_path = "https://aldantech.tk/data/images/"


export const cartId = "productsCart";


export function chooseTheme(hostname, container){
    switch (hostname) {
      case "localhost":
      case "aldantech.tk":
        container.getContainerElement().classList.add("aldantech-theme");
      break;
      case "lamacetita.tk":
        container.getContainerElement().classList.add("lamacetita-theme");
      default:
        break;
    }
  } 
