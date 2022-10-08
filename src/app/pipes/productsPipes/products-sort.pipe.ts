import { Injectable,Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productsSort'
})
export class ProductsSortPipe implements PipeTransform {
  
  transform(array: any, field): any[] {
    if (!Array.isArray(array)) {
      return array;
    }
    if(field.is_date){
      switch(field.type){
        case 'asc':          
          array.sort((a, b) => new Date(b.createdDateTime).getTime() - new Date(a.createdDateTime).getTime());
          break;
        case 'desc':
          array.sort((a, b) => new Date(a.createdDateTime).getTime() - new Date(b.createdDateTime).getTime());
          break;        
      }
    } else{      
      switch(field.type){
        case 'asc':
          if(field.value == 'name'){            
            array.sort((a, b) => ( a.name.localeCompare(b.name)));
          } else if(field.value == 'unitPrice'){
            array.sort((a, b) => (a.unitPrice < b.unitPrice ? -1 : 1) );
          }         
        break;
        case 'desc':
          if(field.value == 'name'){       
            array.sort((a, b) => ( b.name.localeCompare(a.name)));
          }else if(field.value == 'unitPrice'){
            array.sort((a, b) => (a.unitPrice > b.unitPrice ? -1 : 1) );
          }  
          break;
      }     
    }    
    return array;
  }
 
}
