import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'oidc-client';
import { log } from 'util';
import { DataService } from '../../services/data.service';
import { SystemService } from '../../services/system.service';
import { AddNoteComponent } from '../../shared/add-note/add-note.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-notice-board',
  templateUrl: './notice-board.component.html',
  styleUrls: ['./notice-board.component.scss'],
})
export class NoticeBoardComponent implements OnInit {
  formObject: FormGroup;
  submitted: boolean = false;
  isLoading: boolean = false;
  userID: string = "";
  notes: Array<any> = [];
  notesList: Array<any> = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private systemService: SystemService,
    private dataService: DataService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.userID = localStorage.getItem("userID");
    this.getNote();
  }

  getNote() {
    this.isLoading = true;
    this.notes = [];
    this.notesList = [];
    this.systemService.getNotes().then(results => {
      if (results != null && results != undefined && results.length > 0) {
        this.notes = results;
        this.notesList = results;
      }
      this.isLoading = false;
    });
  }

  deleteNote(noteID) {
    this.isLoading = true;
    this.systemService.deleteNote(noteID).then(e => {
      this.getNote();
    });
  }

  addNote() {
    var modalRef = this.modalService.open(AddNoteComponent, { ariaLabelledBy: 'modal-basic-title', size: 'lg' });
    modalRef.result.then(response => {
      this.isLoading = true;
      this.getNote();
    });
  }
}
