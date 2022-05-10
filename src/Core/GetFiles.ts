import { Dirent, readdirSync } from 'fs';
import { logError } from '../Helpers/Log';

class GetFiles {
  private foundFiles: string[] = [];
  private path: string = './';

  setPath(path: string): GetFiles {
    this.path = path;

    return this;
  }

  async getFilesInDirectory(dir: string) {
    try {
      const objectsInDirectory: Dirent[] = await readdirSync(dir, { withFileTypes: true });

      objectsInDirectory.forEach((file: Dirent) => {
        if (file.isDirectory()) {
          this.getFilesInDirectory(`${dir}/${file.name}`);

          return;
        }

        if (file.name.includes('.d.ts')) {
          return;
        }
        this.foundFiles.push(`${dir}/${file.name}`);
      });
    } catch (error: any) {
      logError(error.message);
    }
  }

  async files(): Promise<Array<string>> {
    await this.getFilesInDirectory(this.path);

    return this.foundFiles;
  }
}

export { GetFiles };
