import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TeamMember } from '../../../core/models/team-member.model';

export interface TeamMemberDialogData {
  member: TeamMember | null;
}

@Component({
  selector: 'app-team-form-dialog',
  standalone: false,
  templateUrl: './team-form-dialog.component.html',
  styleUrls: ['./team-form-dialog.component.scss'],
})
export class TeamFormDialogComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TeamFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TeamMemberDialogData
  ) {}

  ngOnInit(): void {
    const member = this.data?.member ?? null;
    this.isEdit = !!member;

    this.form = this.fb.group({
      // ID del personaje en la API de Rick and Morty
      characterId: [
        member?.characterId ?? null,
        [Validators.required, Validators.min(1)],
      ],

      // Nombre del personaje
      characterName: [
        member?.characterName ?? '',
        [Validators.required],
      ],

      // Alias en tu equipo
      alias: [
        member?.alias ?? '',
        [Validators.required],
      ],

      // Nota opcional
      note: [member?.note ?? ''],

      // Prioridad (por defecto medium)
      priority: [
        member?.priority ?? 'medium',
        [Validators.required],
      ],

      // Fecha de creación
      createdAt: [
        member?.createdAt ?? new Date().toISOString(),
      ],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.value;

    const basePayload = {
      characterId: Number(value.characterId),
      characterName: value.characterName,
      alias: value.alias,
      note: value.note ?? '',
      priority: value.priority,
      createdAt: value.createdAt,
    };

    const payload: TeamMember =
      this.isEdit && this.data.member?.id
        ? { id: this.data.member.id, ...basePayload }
        : { ...basePayload };

    this.dialogRef.close(payload);
  }

  onCancel(): void {
    this.dialogRef.close(undefined);
  }
}
