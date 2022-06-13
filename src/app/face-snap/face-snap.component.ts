import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FaceSnap } from '../models/face-snap.model';
import { FaceSnapService } from '../services/face-snaps-service';

@Component({
  selector: 'app-face-snap',
  templateUrl: './face-snap.component.html',
  styleUrls: ['./face-snap.component.scss']
})
export class FaceSnapComponent implements OnInit  {
  @ Input() faceSnap! : FaceSnap;
  snapped!: boolean;
  textButton!: string;

  constructor(private faceSnapsService: FaceSnapService, private router: Router) {}

  ngOnInit(): void {
    this.snapped=false;
    this.textButton="Oh Snap!"
  }

  onAddSnap() {
    this.snapped = !this.snapped;
    if(this.snapped){
    this.faceSnapsService.snapFaceSnapById(this.faceSnap.id, "snap");
    this.textButton = "Oops, un Snap!"
  }else {
    this.faceSnapsService.snapFaceSnapById(this.faceSnap.id, "unsnap");
    this.textButton = "Oh Snap!"
    }
  }

  onViewFaceSnap() {
    this.router.navigateByUrl(`facesnaps/${this.faceSnap.id}`);
}


}
