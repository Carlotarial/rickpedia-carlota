import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocationsService } from '../../../core/services/locations.service';
import { Location } from '../../../core/models/location.model';

@Component({
  selector: 'app-location-detail',
  standalone: false,
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.scss'],
})
export class LocationDetailComponent implements OnInit {
  location: Location | null = null;
  isLoading = true;

  constructor(private route: ActivatedRoute, private locationsService: LocationsService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.locationsService.getLocation(id).subscribe((loc) => {
      this.location = loc;
      this.isLoading = false;
    });
  }
}
