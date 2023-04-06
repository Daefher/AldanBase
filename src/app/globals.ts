//export const api_url='https://aldandev.azurewebsites.net/api/';


//Local Test URL Daniel LAPTOP
//export const api_url = 'https://localhost:5001/api/';
//Local Test URL Daniel PC
export const api_url = 'http://localhost:44352/api/';
//export const img_path = "http://localhost:4200/assets/images/";

export const company_id = 10;

//images Server if we serve them
export const img_path = "https://aldantech.tk/data/images/"


export const cartId = "productsCart";

/** Send the hostname name, will return the current company colors for the theme, also the container has to be an
 * OverLayConainer for this to work.
* @string {hostname} 
* @OverlayContainer {container}
*/
export function chooseTheme(hostname, container) {
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

/** Send the hostname name, will return the current company colors for the charts 
* @string {hostname} 
*/
export function themeCharts(hostname) {
  let overrides = {};
  switch (hostname) {
    case "localhost":
    case "aldantech.tk":
      overrides = {  
        backgroundColor: 'rgba(89,182,197,0.2)',
        borderColor: '#89d2dc',
        pointBackgroundColor: 'rgba(89,182,197)',
        pointBorderColor: 'rgba(89,182,197,0.8)',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#ace0e7',
        fill: 'origin',     
      };
      break;
    case "lamacetita.tk":
      overrides = {  
        backgroundColor: 'rgba(156,246,140,0.2)',
        borderColor: '#9cd88c',
        pointBackgroundColor: '#9cd88c',
        pointBorderColor: 'rgba(156,246,140,0.8)',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#9cd88c',
        fill: 'origin',     
      };  

    default:
      overrides = {  
        backgroundColor: 'rgba(89,182,197,0.2)',
        borderColor: '#89d2dc',
        pointBackgroundColor: 'rgba(89,182,197)',
        pointBorderColor: 'rgba(89,182,197,0.8)',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#ace0e7',
        fill: 'origin',     
      };
      break;
  }
  return overrides
}