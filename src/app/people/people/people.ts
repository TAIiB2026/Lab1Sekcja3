import { ChangeDetectorRef, Component, inject, Inject, OnInit } from '@angular/core';
import { Person } from '../../classes/person';
import { PEOPLE_REPOSITORY_TOKEN } from '../../tokens/people-repository.token';
import { IPeopleRepositoryInterface } from '../../interfaces/people-repository.interface';

@Component({
  selector: 'app-people',
  standalone: false,
  templateUrl: './people.html',
  styles: ``
})
export class People implements OnInit {
  public data?: Person[] = undefined;
  public loading = true;
  private readonly repository = inject(PEOPLE_REPOSITORY_TOKEN);
  private readonly cd = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.repository.Get().subscribe({
      next: (res) => {
        console.log('next', res);
        this.data = res;
        this.loading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.log('error', err);
      },
      complete: () => {
        console.log('complete')
      }
    });
  }

  trackByID(index: number, obj: Person): number {
    return obj.id;
  }

  calculateAge(obj: Person): number {
    const currentTimestamp = Date.now();
    const dateNow = new Date(currentTimestamp);
    console.log('calculateAge');
    return dateNow.getFullYear() - obj.dateOfBirth.getFullYear();
  }
}