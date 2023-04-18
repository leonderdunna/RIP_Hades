import { Component } from '@angular/core';
import {ParseService} from "../parse.service";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  constructor(private parseService:ParseService){}
  fileContent: string | undefined;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      this.fileContent = reader.result as string;

      console.log(this.parseService.parseHadesFile(this.fileContent))
    };

    reader.readAsText(file);
  }
}
