import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EpisodesService } from '../../../core/services/episodes.service';
import { Episode } from '../../../core/models/episode.model';

@Component({
  selector: 'app-episode-detail',
  standalone: false,
  templateUrl: './episode-detail.component.html',
  styleUrls: ['./episode-detail.component.scss'],
})
export class EpisodeDetailComponent implements OnInit {
  episode: Episode | null = null;
  isLoading = false;
  hasError = false;

  constructor(private route: ActivatedRoute, private episodesService: EpisodesService) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);

    if (Number.isNaN(id)) {
      console.error('ID de episodio inválido en la ruta:', idParam);
      this.hasError = true;
      return;
    }

    this.isLoading = true;

    this.episodesService.getEpisode(id).subscribe({
      next: (ep) => {
        console.log('✅ Episodio cargado:', ep);
        this.episode = ep;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('❌ Error al cargar episodio', err);
        this.hasError = true;
        this.isLoading = false;
      },
    });
  }
}
