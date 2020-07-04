import { AppService } from './app.service';
import { Component, OnInit } from '@angular/core';
import { getBasicData } from './data';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Generate Offer Sheet.';
  items: Observable<any[]>;
  public data: any[] = getBasicData();
  public colHeaders: string[] = ['SL NO.', 'GARDEN', 'INVOICE', 'GRADE',
    'PKGS', 'KGS', 'PRICE IDEA', 'COMMENT'];
  public columns: any[] = [
    {
      data: 'slno'
    },
    {
      data: 'garden',
      renderer: 'text',
      readOnly: false
    },
    {
      data: 'invoice',
      readOnly: false
    },
    {
      data: 'grade'
    },
    {
      data: 'packages',
      type: 'numeric',
    },
    {
      data: 'kgs',
      type: 'numeric',
    },
    {
      data: 'price_idea',
      type: 'numeric',
    },
    {
      data: 'comment',
      renderer: 'text'
    }
  ];
  public colWidths: number[] = [null, null, null, null, null, null, 30];
  public options: any = {
    stretchH: 'all',
    columnSorting: true,
    contextMenu: [
      'row_above', 'row_below', 'remove_row'
    ]
  };

 private isChecked: Boolean;
 public isError: Boolean;
 dataList = [];

 constructor(private appServie: AppService) {
 }
 ngOnInit() {
   console.log('ngg gonoijkdng')
   this.getData();
 }

  afterChange(e: any) {
    // tslint:disable-next-line:no-console
    console.log(e);
  }

  afterOnCellMouseDown(e: any) {
    // tslint:disable-next-line:no-console
    console.log(e);
  }

  chekedChange(event) {
    this.isChecked = event.target.checked;
  }

 async onCick() {
   this.isError = false;
   if (this.isChecked) {
     const refactoredData = this.refactorData(this.data);
     this.appServie.saveSheetData(refactoredData).subscribe(res => {
       alert('Data added succesfully');
     }, err => {
      alert('An error occured');
     });
   } else {
     this.isError = true;
   }
  }

  // filter the empty rows
  refactorData(sheetData) {
    let dataList = [];
    sheetData.forEach(data => {
      if (data.slno && data.garden && data.invoice && data.grade && data.packages && data.kgs && data.price_idea) {
        dataList.push(data);
      }
    });
    return dataList;
  }


getData() {
  }
}
