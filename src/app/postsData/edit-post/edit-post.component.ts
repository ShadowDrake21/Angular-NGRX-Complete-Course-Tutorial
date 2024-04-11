import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PostDataService } from '../../services/post-data.service';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.scss',
})
export class EditPostComponent implements OnInit {
  private postService = inject(PostDataService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  editPostForm!: FormGroup;
  id!: string;

  ngOnInit(): void {
    this.editPostForm = new FormGroup({
      title: new FormControl(null),
      description: new FormControl(null),
    });
    this.id = this.route.snapshot.params['id'];
    this.postService.entities$.subscribe((posts) => {
      const post = posts.find((post) => post.id === this.id);
      if (posts.length) {
        this.editPostForm.patchValue({
          title: post?.title,
          description: post?.description,
        });
      }
    });
  }

  onEditPost() {
    const postData = {
      ...this.editPostForm.value,
      id: this.id,
    };

    this.postService.update(postData);
    this.router.navigate(['/posts']);
  }
}
