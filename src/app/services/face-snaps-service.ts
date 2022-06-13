import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { map, Observable, switchMap } from "rxjs";
import { FaceSnap } from "../models/face-snap.model";



@Injectable({
    providedIn: 'root'
})
export class FaceSnapService {

    constructor(private http: HttpClient){}

    faceSnaps: FaceSnap[] = [];

      getAllFaceSnaps(): Observable<FaceSnap[]>{
          return this.http.get<FaceSnap[]>('http://localhost:3000/facesnaps');
      }

      getFaceSnapById(faceSnapId: number): Observable<FaceSnap> {
        return this.http.get<FaceSnap>(`http://localhost:3000/facesnaps/${faceSnapId}`);
        // const faceSnap = this.faceSnaps.find(faceSnap => faceSnap.id === faceSnapId);
        // if (!faceSnap) {
        //     throw new Error('FaceSnap not found!');
        // } else {
        //     return faceSnap;
        // }
      }

      snapFaceSnapById(faceSnapId: number, snapType: 'snap' | 'unsnap'): Observable<FaceSnap> {
        return this.getFaceSnapById(faceSnapId).pipe(
          map(faceSnap => ({
            ...faceSnap, 
            snaps: faceSnap.snaps +( snapType =='snap' ?1:-1)
          })), 
          switchMap(updatedFaceSnap => this.http.put<FaceSnap>(
            `http://localhost:3000/facesnaps/${faceSnapId}`,
           updatedFaceSnap))
        )
        //  const faceSnap = this.getFaceSnapById(faceSnapId);
        //  snapType === 'snap' ? faceSnap.snaps ++ : faceSnap.snaps--;

      }

      addFaceSnap(formValue: { title: string, description: string, imageUrl: string, location?: string }): Observable<FaceSnap> {
        return this.getAllFaceSnaps().pipe(
            map(facesnaps => [...facesnaps].sort((a,b) => a.id - b.id)),
            map(sortedFacesnaps => sortedFacesnaps[sortedFacesnaps.length - 1]),
            map(previousFacesnap => ({
                ...formValue,
                snaps: 0,
                createdDate: new Date(),
                id: previousFacesnap.id + 1
            })),
            switchMap(newFacesnap => this.http.post<FaceSnap>(
                'http://localhost:3000/facesnaps',
                newFacesnap)
            )
        );
      }

      // addFaceSnap(formSnap: { title: string, description: string, imageUrl: string, location?: string }) : boolean{
      //   if(!formSnap){
      //     //throw new Error("Error lors de l'ajout d'un nouveau faceSnap");
      //     return false;
      //   }else{
      //    const  faceSnap: FaceSnap = {
      //       ...formSnap, 
      //       createdDate: new Date(),
      //       snaps: 0, 
      //       id: this.faceSnaps[this.faceSnaps.length-1].id+1
      //     };
      //     this.faceSnaps.push(faceSnap);
      //     return true;
      //   }
      // }
      

}