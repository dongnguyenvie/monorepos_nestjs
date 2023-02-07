export class DescriptionAPI {
  public isPublic: boolean | undefined
  public isSystem: boolean | undefined
  public group: string | undefined
  public isSub: boolean | undefined
  public title: string | undefined
  public description: string | undefined
  public isDefault: boolean | undefined

  constructor(partial: Partial<DescriptionAPI> = {}) {
    Object.assign(this, partial)
  }

  get toJson() {
    return JSON.stringify({
      isPublic: this.isPublic,
      title: this.title,
      description: this.description,
      isSystem: this.isSystem,
      isSub: this.isSub,
      group: this.group,
    })
  }

  static Builder = class {
    public isPublic = false
    public isSystem = false
    public isSub = false
    public title = ''
    public description = ''
    public group = ''
    constructor() {}

    public withPublic() {
      this.isPublic = true
      return this
    }

    public withSystem() {
      this.isSystem = true
      return this
    }

    public withSub() {
      this.isSub = true
      return this
    }

    public withGroup(group: string) {
      this.group = group
      return this
    }

    public withTitle(title: string) {
      this.title = title
      return this
    }

    public withDesc(description: string) {
      this.description = description
      return this
    }

    public build() {
      const desc = new DescriptionAPI()
      desc.isPublic = this.isPublic
      desc.description = this.description
      desc.title = this.title
      desc.isSystem = this.isSystem
      desc.isSub = this.isSub
      desc.group = this.group
      return desc.toJson
    }
  }

  static API() {
    return new this.Builder()
  }

  static fromString(str: string) {
    try {
      const dataParsed = JSON.parse(str)
      const desc = {
        isPublic: dataParsed.publ,
        title: dataParsed.t,
        description: dataParsed.desc,
        isSystem: dataParsed.sys,
        isSub: dataParsed.sub,
        group: dataParsed.gr,
        isDefault: dataParsed.d,
      }

      return new DescriptionAPI(desc)
    } catch (error) {
      return {}
    }
  }
}
