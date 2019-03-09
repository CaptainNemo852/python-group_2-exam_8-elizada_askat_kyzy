from django.db import models


STATUS_CHOISES = [
    ("turn", 'Turn'),
    ("in work", 'In work'),
    ("done", 'Done')
]


class Task(models.Model):
    summary = models.CharField(max_length=255)
    description = models.TextField(max_length=2000, null=True, blank=True)
    due_date = models.DateTimeField()
    status = models.CharField(max_length=50, choices=STATUS_CHOISES, default="turn")
    time_planned = models.DecimalField(max_digits=6, decimal_places=1, null=True, blank=True)


    def __str__(self):
        return "%s-%s" % (self.summary,self.status )