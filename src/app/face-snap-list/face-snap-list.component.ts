import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subject, tap } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { FaceSnap } from '../models/face-snap.model';
import { FaceSnapService } from '../services/face-snaps-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-face-snap-list',
  templateUrl: './face-snap-list.component.html',
  styleUrls: ['./face-snap-list.component.scss']
})
export class FaceSnapListComponent implements OnInit{

  faceSnaps!: FaceSnap[];
  faceSnaps$!: Observable<FaceSnap[]>;

  constructor(private faceSnapService: FaceSnapService) { }
 
  ngOnInit() {
    // this.faceSnaps = this.faceSnapService.getAllFaceSnaps();
    this.faceSnaps$ = this.faceSnapService.getAllFaceSnaps();
   
  }
}
