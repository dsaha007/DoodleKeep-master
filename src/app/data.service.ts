import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  cards: any[] = [];
  welcomeId: string = '';
  userToken: string = '';
  apiUrl: string = environment.databaseURL; // Use databaseURL from environment
  isEdit: boolean = false;
  singleNoteId: string = '';

  constructor(private http: HttpClient) {}

  getId(id: string, id2: string) {
    this.userToken = id;
    this.welcomeId = id2;
    console.log('User Token:', this.userToken);
    console.log('Welcome ID:', this.welcomeId);
  }

  onSendRequest(values: any) {
    return this.http.post(
      `${this.apiUrl}/${this.welcomeId}.json?auth=${this.userToken}`,
      values
    );
  }

  onFetchData() {
    return this.http.get(
      `${this.apiUrl}/${this.welcomeId}.json?auth=${this.userToken}`
    ).pipe(
      map((res: any) => {
        if (!res) return [];
        return Object.keys(res)
          .filter((key) => {
            const note = res[key];
            return (
              note.owner === this.welcomeId || // Check if the user is the owner
              (note.collaborators && note.collaborators.includes(this.welcomeId)) // Check if the user is a collaborator
            );
          })
          .map((key) => ({
            id: key,
            ...res[key],
          }));
      })
    );
  }

  onDeleteTask(id: string) {
    return this.http.delete(
      `${this.apiUrl}/${this.welcomeId}/${id}.json?auth=${this.userToken}`
    );
  }

  onEditTask(id: string) {
    this.singleNoteId = id;
    this.isEdit = true;
  }

  onEditingNote(values: any) {
    return this.http.patch(
      `${this.apiUrl}/${this.welcomeId}/${this.singleNoteId}.json?auth=${this.userToken}`,
      values
    );
  }

  onAddCollaborator(noteId: string, collaboratorEmail: string) {
    return this.http.get(
      `${this.apiUrl}/${this.welcomeId}/${noteId}.json?auth=${this.userToken}`
    ).pipe(
      // Fetch the existing collaborators
      map((note: any) => {
        const collaborators = note.collaborators || [];
        if (!collaborators.includes(collaboratorEmail)) {
          collaborators.push(collaboratorEmail);
        }
        return collaborators;
      }),
      // Update the collaborators field
      switchMap((updatedCollaborators) => {
        return this.http.patch(
          `${this.apiUrl}/${this.welcomeId}/${noteId}.json?auth=${this.userToken}`,
          { collaborators: updatedCollaborators }
        );
      })
    );
  }
}
