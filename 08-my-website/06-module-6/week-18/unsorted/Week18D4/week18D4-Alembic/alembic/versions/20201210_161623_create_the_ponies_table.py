"""create the ponies table

Revision ID: f9151117ff02
Revises: 8f00bab3fbcb
Create Date: 2020-12-10 16:16:23.110242

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f9151117ff02'
down_revision = '8f00bab3fbcb'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "ponies",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("name", sa.String(100), nullable=False),
        sa.Column("breed", sa.String(20), nullable=False),
        sa.Column("birth_year", sa.Integer, nullable=False),
        sa.Column("owner_id",
                  sa.Integer,
                  sa.ForeignKey("owners.id"),
                  nullable=False)
    )


def downgrade():
    op.drop_table("ponies")
