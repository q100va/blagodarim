import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
//import {TabViewModule} from 'primeng/tabview';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { jsPDF } from 'jspdf';
import * as printJS from 'print-js';

@Component({
  selector: 'app-younger',
  templateUrl: './younger.component.html',
  styleUrls: ['./younger.component.css'],
})
export class YoungerComponent implements OnInit {
  fullName!: string;
  institute!: string;
  class!: string;
  disable: Boolean = true;
  form!: FormGroup;
  myName: string = 'o.kustova';
  domain: string = 'starikam';
  paragraphY: number = 0;

  @ViewChild('myCanvas', { static: true }) myCanvas!: ElementRef;
  @ViewChild('inputName') inputName!: ElementRef;
  @ViewChild('inputInstitute') inputInstitute!: ElementRef;
  @ViewChild('submit') submit!: ElementRef;
  @ViewChild('clear') clear!: ElementRef;
  @ViewChild('clearFullName') clearFullName!: ElementRef;
  @ViewChild('clearClass') clearClass!: ElementRef;
  @ViewChild('clearInstitute') clearInstitute!: ElementRef;
  @ViewChild('download') download!: ElementRef;
  @ViewChild('printJPEG') printJPEG!: ElementRef;

  //public ctx!: CanvasRenderingContext2D;
  constructor(private primengConfig: PrimeNGConfig, private fb: FormBuilder) {}

  ngOnInit() {}

  longText(
    maxWidth: number,
    lineHeight: number,
    marginLeft: number,
    marginTop: number,
    text: string,
    ctx: CanvasRenderingContext2D
  ) {
    let words = text.split(' ');
    let countWords = words.length;

    let line = '';
    for (let n = 0; n < countWords; n++) {
      let testLine = line + words[n] + ' ';
      let testWidth = ctx.measureText(testLine).width;
      if (testWidth > maxWidth) {
        ctx.fillText(line, marginLeft, marginTop);
        line = words[n] + ' ';
        marginTop += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, marginLeft, marginTop);
    return (this.paragraphY = marginTop + lineHeight+10);
  }

  fillWhite(ctx: CanvasRenderingContext2D ) {
    ctx.fillStyle = 'white';
    ctx.fillRect(14, 225, 564, 130);
  }

  ngAfterViewInit(): void {
    let img = new Image();
    img.src = 'assets/winter33.jpg';
    let ctx = this.myCanvas.nativeElement.getContext('2d');
    let myCanvas = this.myCanvas.nativeElement;
    let submit = this.submit.nativeElement;
    console.log(submit);
    let clear = this.clear.nativeElement;
    let clearFullName = this.clearFullName.nativeElement;
    let clearClass = this.clearClass.nativeElement;
    let clearInstitute = this.clearInstitute.nativeElement;
    let download = this.download.nativeElement;
    let printJPEG = this.printJPEG.nativeElement;

    let text1: string =
      'От всей души благодарим тебя за участие в поздравлении с праздниками бабушек и дедушек, живущих в домах престарелых. Твои открытки подарят им праздник и радость.';
    let text2: string =
      'Желаем тебе счастья, здоровья и радости!';

    img.addEventListener(
      'load',
      () => {
        ctx.drawImage(img, 0, 0);
        ctx.font = '25px Verdana';
        ctx.textAlign = 'center';
      //  ctx.fillText('ДОРОГОЙ ДРУГ!', 298, 210);
        ctx.font = '15px Arial';

        this.longText(500, 26, 298, 380, text1, ctx);
        this.longText(500, 26, 298, this.paragraphY, text2, ctx);

        ctx.fillText(
          '',
          298,
          this.paragraphY
        );

        let date: Date = new Date();
        let dateString: string;
        dateString =
          String(date.getDate()).padStart(2, '0') +
          '.' +
          String(date.getMonth() + 1).padStart(2, '0') +
          '.' +
          date.getFullYear();
        ctx.font = '12px Verdana';
        ctx.textAlign = 'left';
       //ctx.fillText('Елизавета Олескина', 157, this.paragraphY+60);
        ctx.fillText('Твой фонд "Старость в радость"', 337, this.paragraphY+20);
        ctx.fillText('Москва, ' + dateString, 337, this.paragraphY+50);
      },
      false
    );

    submit.addEventListener('click', () => {
      let yName = 260;
      let yClass = 290;
      let yInstitute = 320;
      if (!this.class && !this.institute) {
        yName = 290;
      }
      if (this.class && !this.institute) {
        yName = 280;
        yClass = 310;
      }
      if (!this.class && this.institute) {
        yName = 270;
        yInstitute = 310;
      }

      this.fillWhite(ctx);
      ctx.font = '20px Verdana';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#00269F';
      ctx.fillText(this.fullName, 298, yName);
      ctx.font = '16px Verdana';
      if (this.class) {
        ctx.fillText(this.class, 298, yClass);
      }
      if (this.institute) {
        let words = this.institute.split(' ');
        let countWords = words.length;
        let line = '';
        let maxWidth: number = 550; //размер поле, где выводится текст
        let lineHeight: number = 30;
        let marginLeft: number = 298;
        let marginTop: number = yInstitute;
        for (let n = 0; n < countWords; n++) {
          let testLine = line + words[n] + ' ';
          let testWidth = ctx.measureText(testLine).width;
          if (testWidth > maxWidth) {
            ctx.fillText(line, marginLeft, marginTop);
            line = words[n] + ' ';
            marginTop += lineHeight;
          } else {
            line = testLine;
          }
        }
        ctx.fillText(line, marginLeft, marginTop);
      }
      this.disable = false;
      console.log(this.disable);
    });

    clear.addEventListener('click', () => {
      this.disable = true;
      this.fullName = '';
      this.class = '';
      this.institute = '';
      this.fillWhite(ctx);
    });
    clearFullName.addEventListener('click', () => {
      this.disable = true;
      this.fullName = '';
      this.fillWhite(ctx);
    });
    clearClass.addEventListener('click', () => {
      this.disable = true;
      this.class = '';
      this.fillWhite(ctx);
    });
    clearInstitute.addEventListener('click', () => {
      this.disable = true;
      this.institute = '';
      this.fillWhite(ctx);
    });

    download.addEventListener(
      'click',
      () => {
        // only jpeg is supported by jsPDF
        let imgData = myCanvas.toDataURL('image/jpeg', 1.0);

        let pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: [210, 297],
        });

        console.log(myCanvas.width);
        console.log(myCanvas.height);
        console.log(pdf);

        pdf.addImage(imgData, 'JPEG', 0, 0, 210, 298);
        pdf.save(`${this.fullName}_blgSVR.pdf`);
      },
      false
    );

    printJPEG.addEventListener(
      'click',
      function () {
        printJS({
          printable: myCanvas.toDataURL('image/jpeg', 1.0),
          type: 'image',
          imageStyle: 'width:100%',
        });
      },
      false
    );
  }
}
