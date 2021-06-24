from django import forms
from .models import Comment


class CommentForm(forms.ModelForm):

    class Meta:
        model = Comment
        fields = ('content',)
        widgets = {'content': forms.Textarea(attrs={
            'placeholder': 'نظر خود را بنویسید...',
            'class': 'form-control blue-green-textarea',
            'rows': 6
        })}
