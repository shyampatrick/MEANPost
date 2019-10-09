import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  templateUrl: 'error.component.html'
})
export class ErrorComponent implements OnInit {
  message = 'An Unknown Error Occurred';

  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {}

  ngOnInit() {}
}
