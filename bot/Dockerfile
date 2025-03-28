FROM gorialis/discord.py:3.10.11-alpine-full
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

WORKDIR /bot

# Copy the project into the image
ADD . /bot

# Sync the project into a new environment, using the frozen lockfile
WORKDIR /bot
RUN uv sync --frozen

CMD [ "uv", "run", "bot.py" ]