import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { FaceSnap } from '../models/face-snap.model';
import { FaceSnapService } from '../services/face-snaps-service';

@Component({
  selector: 'app-single-face-snap',
  templateUrl: './single-face-snap.component.html',
  styleUrls: ['./single-face-snap.component.scss']
})
export class SingleFaceSnapComponent implements OnInit {

  @ Input() faceSnap$! : Observable<FaceSnap>;

  snapped!: boolean;
  textButton!: string;

  constructor(private faceSnapsService: FaceSnapService, private route: ActivatedRoute) {
    const snapId = +this.route.snapshot.params['id'];
    this.faceSnap$ = this.faceSnapsService.getFaceSnapById(snapId);
  }

  ngOnInit(): void {
    this.snapped=false;
    this.textButton="Oh Snap!"
  }

    onAddSnap(faceSnapId: number) {
      if (this.textButton === 'Oh Snap!') {
          this.faceSnap$ = this.faceSnapsService.snapFaceSnapById(faceSnapId, 'snap').pipe(
              tap(() => this.textButton = 'Oops, unSnap!')
          );
      } else {
          this.faceSnap$ = this.faceSnapsService.snapFaceSnapById(faceSnapId, 'unsnap').pipe(
              tap(() => this.textButton = 'Oh Snap!')
          );
      }
  }

}


