import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParseService {


  parseHadesFile(f: string): any {
    console.log(f)
    // @ts-ignore
    let components = this.extract(f,"signals")
    console.log(components);

  }

  extract(f:string,s:string):string[]{

    // @ts-ignore
    return f.match(new RegExp(`\\[${s}](.*)\\[end ${s}]`,"gs"))[0].replaceAll(/(\[[^\[\]}]*])/gs,"").trim().split(/[\n\r]+/)

  }
}
