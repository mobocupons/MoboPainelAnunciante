import { Component, Input, OnInit } from "@angular/core";
import { SafeResourceUrl, DomSanitizer } from "@angular/platform-browser";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { DocsModalModel } from "src/app/shared/models/docs-modal-model";

@Component({
  selector: "app-docs-modal",
  templateUrl: "./docs-modal.component.html",
  styleUrls: ["./docs-modal.component.scss"],
})
export class DocsModalComponent implements OnInit {
  public imageTypes = [
    "apng",
    "avif",
    "bmp",
    "gif",
    "jpg",
    "jpeg",
    "jfif",
    "pjpeg",
    "pjp",
    "png",
    "svg",
    "webp",
  ];
  public videoDictionary = {
    mp4: "video/mp4",
    ogv: "video/ogg",
    webm: "video/webm",
  };
  public audioDictionary = {
    mp3: "audio/mpeg",
    wav: "audio/wav",
    weba: "audio/webm",
    ogg: "audio/ogg",
    mpeg: "audio/mpeg",
  };
  public docTypes = ["doc", "docx"];

  public currentDoc: string;
  public url: string;
  public fileType: FileTypeEnum;
  public fileTypeEnum = FileTypeEnum;
  public fileExtension: string;
  public urlSafe: SafeResourceUrl;
  public isExternal: boolean;

  private _modalData: DocsModalModel[];

  public get modalData(): DocsModalModel[] {
    return this._modalData;
  }
  @Input()
  public set modalData(v: DocsModalModel[]) {
    if (!v[0]) return;
    this._modalData = v;
    this.currentDoc = v[0].name;
    this.url = v[0].url;
    this.isExternal = v[0].isExternal;

    this.sanitize();
  }

  constructor(
    public activeModal: NgbActiveModal,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit() {}

  sanitize() {
    this.urlSafe = null;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    this.fileExtension = this.url.split(".").pop().toLowerCase();;
    this.fileType = this.setFileType(this.fileExtension);
    if(this.fileType == FileTypeEnum.Doc) {
      this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(`https://docs.google.com/gview?url=${this.url}&embedded=true`)
    }
  }

  setFileType(fileExtension) {
    if (this.imageTypes.includes(fileExtension)) return FileTypeEnum.Image;
    if (this.videoDictionary[fileExtension]) return FileTypeEnum.Video;
    if (fileExtension == "pdf") return FileTypeEnum.Pdf;
    if (this.docTypes.includes(fileExtension)) return FileTypeEnum.Doc;
    if (this.audioDictionary[fileExtension]) return FileTypeEnum.Audio;
    return FileTypeEnum.Unsupported;
  }

  fileChange(doc: DocsModalModel) {
    this.currentDoc = doc.name;
    this.url = doc.url;
    this.isExternal = doc.isExternal;
    this.sanitize();
  }
}

export enum FileTypeEnum {
  Image,
  Video,
  Pdf,
  Doc,
  Audio,
  Unsupported,
}
