import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-person',
  standalone: false,
  templateUrl: './person.html',
  styles: ``,
})
export class PersonComponent implements OnInit {
  public id!: number;
  public idTekst!: string;

  private readonly activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(x => {
      const id = x['id'];
      this.idTekst = id;

      const idLiczba = parseInt(id);

      if(isNaN(idLiczba)) {
        this.id = -1;
      } else {
        this.id = idLiczba;
      }
    });
  }
}